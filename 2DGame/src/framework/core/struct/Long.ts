module dc
{
    /**
     * 64位整形
     * @author hannibal
     * @time 2017-7-10
     */
	export class ULong 
	{
        lo: number;
        hi: number;
        /**
         * ULong implements some 64-bit arithmetic routines necessary for properly
         * handling 64-bit integer fields. It implements lossless integer arithmetic on
         * top of JavaScript's number type, which has only 53 bits of precision, by
         * representing 64-bit integers as two 32-bit halves.
         *
         * @param {number} lo The low 32 bits.
         * @param {number} hi The high 32 bits.
         * @constructor
         */
        constructor(lo:number, hi:number) {
            /**
             * The low 32 bits.
             * @public {number}
             */
            this.lo = lo;
            /**
             * The high 32 bits.
             * @public {number}
             */
            this.hi = hi;
        };


        /**
         * Compare two 64-bit numbers. Returns -1 if the first is
         * less, +1 if the first is greater, or 0 if both are equal.
         * @param {!jspb.arith.ULong} other
         * @return {number}
         */
        public cmp(other:ULong) :number {
            if (this.hi < other.hi || (this.hi == other.hi && this.lo < other.lo)) {
                return -1;
            } else if (this.hi == other.hi && this.lo == other.lo) {
                return 0;
            } else {
                return 1;
            }
        };


        /**
         * Right-shift this number by one bit.
         * @return {!jspb.arith.ULong}
         */
        public rightShift():ULong {
            let hi = this.hi >>> 1;
            let lo = (this.lo >>> 1) | ((this.hi & 1) << 31);
            return new ULong(lo >>> 0, hi >>> 0);
        };


        /**
         * Left-shift this number by one bit.
         * @return {!jspb.arith.ULong}
         */
        public leftShift(): ULong {
            let lo = this.lo << 1;
            let hi = (this.hi << 1) | (this.lo >>> 31);
            return new ULong(lo >>> 0, hi >>> 0);
        };


        /**
         * Test the MSB.
         * @return {boolean}
         */
        public msb(): boolean{
            return !!(this.hi & 0x80000000);
        };


        /**
         * Test the LSB.
         * @return {boolean}
         */
        public lsb (): boolean{
            return !!(this.lo & 1);
        };


        /**
         * Test whether this number is zero.
         * @return {boolean}
         */
        public zero ():boolean {
            return this.lo == 0 && this.hi == 0;
        };


        /**
         * Add two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.ULong} other
         * @return {!jspb.arith.ULong}
         */
        public add (other:ULong):ULong {
            let lo = ((this.lo + other.lo) & 0xffffffff) >>> 0;
            let hi =
                (((this.hi + other.hi) & 0xffffffff) >>> 0) +
                (((this.lo + other.lo) >= 0x100000000) ? 1 : 0);
            return new ULong(lo >>> 0, hi >>> 0);
        };


        /**
         * Subtract two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.ULong} other
         * @return {!jspb.arith.ULong}
         */
        public sub (other:ULong):ULong {
            let lo = ((this.lo - other.lo) & 0xffffffff) >>> 0;
            let hi =
                (((this.hi - other.hi) & 0xffffffff) >>> 0) -
                (((this.lo - other.lo) < 0) ? 1 : 0);
            return new ULong(lo >>> 0, hi >>> 0);
        };


        /**
         * Multiply two 32-bit numbers to produce a 64-bit number.
         * @param {number} a The first integer:  must be in [0, 2^32-1).
         * @param {number} b The second integer: must be in [0, 2^32-1).
         * @return {!jspb.arith.ULong}
         */
        public static mul32x32 = function (a: number, b: number): ULong {
            // Directly multiplying two 32-bit numbers may produce up to 64 bits of
            // precision, thus losing precision because of the 53-bit mantissa of
            // JavaScript numbers. So we multiply with 16-bit digits (radix 65536)
            // instead.
            let aLow = (a & 0xffff);
            let aHigh = (a >>> 16);
            let bLow = (b & 0xffff);
            let bHigh = (b >>> 16);
            let productLow =
                // 32-bit result, result bits 0-31, take all 32 bits
                (aLow * bLow) +
                // 32-bit result, result bits 16-47, take bottom 16 as our top 16
                ((aLow * bHigh) & 0xffff) * 0x10000 +
                // 32-bit result, result bits 16-47, take bottom 16 as our top 16
                ((aHigh * bLow) & 0xffff) * 0x10000;
            let productHigh =
                // 32-bit result, result bits 32-63, take all 32 bits
                (aHigh * bHigh) +
                // 32-bit result, result bits 16-47, take top 16 as our bottom 16
                ((aLow * bHigh) >>> 16) +
                // 32-bit result, result bits 16-47, take top 16 as our bottom 16
                ((aHigh * bLow) >>> 16);

            // Carry. Note that we actually have up to *two* carries due to addition of
            // three terms.
            while (productLow >= 0x100000000) {
                productLow -= 0x100000000;
                productHigh += 1;
            }

            return new ULong(productLow >>> 0, productHigh >>> 0);
        };


        /**
         * Multiply this number by a 32-bit number, producing a 96-bit number, then
         * truncate the top 32 bits.
         * @param {number} a The multiplier.
         * @return {!jspb.arith.ULong}
         */
        public mul (a:number):ULong {
            // Produce two parts: at bits 0-63, and 32-95.
            let lo = ULong.mul32x32(this.lo, a);
            let hi = ULong.mul32x32(this.hi, a);
            // Left-shift hi by 32 bits, truncating its top bits. The parts will then be
            // aligned for addition.
            hi.hi = hi.lo;
            hi.lo = 0;
            return lo.add(hi);
        };


        /**
         * Divide a 64-bit number by a 32-bit number to produce a
         * 64-bit quotient and a 32-bit remainder.
         * @param {number} _divisor
         * @return {Array.<jspb.arith.ULong>} array of [quotient, remainder],
         * unless divisor is 0, in which case an empty array is returned.
         */
        public div (_divisor:number): Array<ULong> {
            if (_divisor == 0) {
                return [];
            }

            // We perform long division using a radix-2 algorithm, for simplicity (i.e.,
            // one bit at a time). TODO: optimize to a radix-2^32 algorithm, taking care
            // to get the letiable shifts right.
            let quotient = new ULong(0, 0);
            let remainder = new ULong(this.lo, this.hi);
            let divisor = new ULong(_divisor, 0);
            let unit = new ULong(1, 0);

            // Left-shift the divisor and unit until the high bit of divisor is set.
            while (!divisor.msb()) {
                divisor = divisor.leftShift();
                unit = unit.leftShift();
            }

            // Perform long division one bit at a time.
            while (!unit.zero()) {
                // If divisor < remainder, add unit to quotient and subtract divisor from
                // remainder.
                if (divisor.cmp(remainder) <= 0) {
                    quotient = quotient.add(unit);
                    remainder = remainder.sub(divisor);
                }
                // Right-shift the divisor and unit.
                divisor = divisor.rightShift();
                unit = unit.rightShift();
            }

            return [quotient, remainder];
        };


        /**
         * Convert a 64-bit number to a string.
         * @return {string}
         * @override
         */
        public toString (): string {
            let result = '';
            let num:ULong = this;
            while (!num.zero()) {
                let divResult = num.div(10);
                let quotient = divResult[0], remainder = divResult[1];
                result = remainder.lo + result;
                num = quotient;
            }
            if (result == '') {
                result = '0';
            }
            return result;
        };


        /**
         * Parse a string into a 64-bit number. Returns `null` on a parse error.
         * @param {string} s
         * @return {?jspb.arith.ULong}
         */
        public static fromString = function (s):ULong {
            let result = new ULong(0, 0);
            // optimization: reuse this instance for each digit.
            let digit64 = new ULong(0, 0);
            for (let i = 0; i < s.length; i++) {
                if (s[i] < '0' || s[i] > '9') {
                    return null;
                }
                let digit = parseInt(s[i], 10);
                digit64.lo = digit;
                result = result.mul(10).add(digit64);
            }
            return result;
        };


        /**
         * Make a copy of the ULong.
         * @return {!jspb.arith.ULong}
         */
        public clone ():ULong {
            return new ULong(this.lo, this.hi);
        };

		public ReadExternal(input:LayaByte):void
		{
			this.hi = input.getUint32();
			this.lo = input.getUint32();
		}
		public WriteExternal(output:LayaByte):void 
		{
			output.writeUint32(this.hi);
			output.writeUint32(this.lo);
		}
    }

    export class Long
	{
        lo: number;
        hi: number;
        /**
         * Long is like ULong, but modifies string conversions to interpret the stored
         * 64-bit value as a twos-complement-signed integer. It does *not* support the
         * full range of operations that ULong does: only add, subtract, and string
         * conversions.
         *
         * N.B. that multiply and divide routines are *NOT* supported. They will throw
         * exceptions. (They are not necessary to implement string conversions, which
         * are the only operations we really need in jspb.)
         *
         * @param {number} lo The low 32 bits.
         * @param {number} hi The high 32 bits.
         * @constructor
         */
        constructor(lo, hi) {
            /**
             * The low 32 bits.
             * @public {number}
             */
            this.lo = lo;
            /**
             * The high 32 bits.
             * @public {number}
             */
            this.hi = hi;
        };


        /**
         * Add two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.Long} other
         * @return {!jspb.arith.Long}
         */
        public add (other:Long):Long {
            let lo = ((this.lo + other.lo) & 0xffffffff) >>> 0;
            let hi =
                (((this.hi + other.hi) & 0xffffffff) >>> 0) +
                (((this.lo + other.lo) >= 0x100000000) ? 1 : 0);
            return new Long(lo >>> 0, hi >>> 0);
        };


        /**
         * Subtract two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.Long} other
         * @return {!jspb.arith.Long}
         */
        public sub (other:Long):Long {
            let lo = ((this.lo - other.lo) & 0xffffffff) >>> 0;
            let hi =
                (((this.hi - other.hi) & 0xffffffff) >>> 0) -
                (((this.lo - other.lo) < 0) ? 1 : 0);
            return new Long(lo >>> 0, hi >>> 0);
        };


        /**
         * Make a copy of the Long.
         * @return {!jspb.arith.Long}
         */
        public clone ():Long {
            return new Long(this.lo, this.hi);
        };


        /**
         * Convert a 64-bit number to a string.
         * @return {string}
         * @override
         */
        public toString () :string {
            // If the number is negative, find its twos-complement inverse.
            let sign = (this.hi & 0x80000000) != 0;
            let num = new ULong(this.lo, this.hi);
            if (sign) {
                num = new ULong(0, 0).sub(num);
            }
            return (sign ? '-' : '') + num.toString();
        };


        /**
         * Parse a string into a 64-bit number. Returns `null` on a parse error.
         * @param {string} s
         * @return {?jspb.arith.Long}
         */
        public static fromString(s:string):Long {
            let hasNegative = (s.length > 0 && s[0] == '-');
            if (hasNegative) {
                s = s.substring(1);
            }
            let num = ULong.fromString(s);
            if (num === null) {
                return null;
            }
            if (hasNegative) {
                num = new ULong(0, 0).sub(num);
            }
            return new Long(num.lo, num.hi);
        }
		
		public ReadExternal(input:LayaByte):void
		{
			this.hi = input.getInt32();
			this.lo = input.getInt32();
		}
		public WriteExternal(output:LayaByte):void 
		{
			output.writeInt32(this.hi);
			output.writeInt32(this.lo);
		}
    }	
}