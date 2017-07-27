module dc
{
    /**
     * 定义键盘键值
     * @author hannibal
     * @time 2017-7-27
     */
	export enum eKeyCode
	{
        NONE			= 0,
        BackSpace		= 8,
		Tab				= 9,
		Clear			= 12,
		Enter			= 13,
		Shift			= 16,
		Control			= 17,
		Alt				= 18,
		CapeLock		= 20,
		Esc				= 27,
		Spacebar		= 32,
		PageUp			= 33,
		PageDown		= 34,
		End				= 35,
		Home			= 36,
		LeftArrow		= 37,
		UpArrow			= 38,
		RightArrow		= 39,
		DownArrow		= 40,
		Insert			= 45,
		Delete			= 46,
		
		Alpha0			= 48,//非数字键盘键码值
		Alpha1			= 49,
		Alpha2			= 50,
		Alpha3			= 51,
		Alpha4			= 52,
		Alpha5			= 53,
		Alpha6			= 54,
		Alpha7			= 55,
		Alpha8			= 56,
		Alpha9			= 57,
		
		A				= 65,
		B				= 66,
		C				= 67,
		D				= 68,
		E				= 69,
		F				= 70,
		G				= 71,
		H				= 72,
		I				= 73,
		J				= 74,
		K				= 75,
		L				= 76,
		M				= 77,
		N				= 78,
		O				= 79,
		P				= 80,
		Q				= 81,
		R				= 82,
		S				= 83,
		T				= 84,
		U				= 85,
		V				= 86,
		W				= 87,
		X				= 88,
		Y				= 89,
		Z				= 90,
		
		F1				= 112,
		F2				= 113,
		F3				= 114,
		F4				= 115,
		F5				= 116,
		F6				= 117,
		F7				= 118,
		F8				= 119,
		F9				= 120,
		F10				= 121,
		F11				= 122,
		F12				= 123,
		
		NumLock			= 144,
		
		ADD				= 187,
		SUBJECT			= 189,
		WAVYLINE		= 192,
	    LINE_H			= 220,

		MAX,
	}
}
/*
		字母和数字键的键码值(keyCode)
		按键	键码	按键	键码	按键	键码	按键	键码
		A	65	J	74	S	83	1	49
		B	66	K	75	T	84	2	50
		C	67	L	76	U	85	3	51
		D	68	M	77	V	86	4	52
		E	69	N	78	W	87	5	53
		F	70	O	79	X	88	6	54
		G	71	P	80	Y	89	7	55
		H	72	Q	81	Z	90	8	56
		I	73	R	82	0	48	9	57
		　　  
		
		数字键盘上的键的键码值(keyCode)	功能键键码值(keyCode)
		按键	键码	     按键		   键码	按键	键码    按键    键码
		0	96		8		104	F1	112	F7	118
		1	97		9		105	F2	113	F8	119
		2	98		*		106	F3	114	F9	120
		3	99		+		107	F4	115	F10	121
		4	100		Enter	        108	F5	116	F11	122
		5	101		-		109	F6	117	F12	123
		6	102		.		110	  	  	  	  
		7	103		/		111	  	  	  	 
		　　  
		
		控制键键码值(keyCode)
		按键		键码	    按键	           键码		 按键		键码	      按键     键码
		BackSpace	8		Esc		27		Right Arrow	39		-_	189
		Tab		9		Spacebar	32		Down Arrow	40		.>	190
		Clear		12		Page Up		33		Insert		45		/?	191
		Enter		13		Page Down	34		Delete		46		`~	192
		Shift		16		End		35		Num Lock	144		[{	219
		Control		17		Home		36		,:		186		\|	220
		Alt		18		Left Arrow	37		=+		187		]}	221
		Cape Lock	20		Up Arrow	38		,<		188	‘	”	222		
*/