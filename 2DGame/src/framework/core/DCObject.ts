// module dc
// {	
// 	/**
//      * 基础类
//      * @author hannibal
//      * @time 2017-8-2
//      */
// 	export class DCObject implements IPoolsObject
// 	{
//         protected m_CompnentList:Array<ComponentBase> = null;

// 		constructor()
// 		{
// 			this.m_CompnentList = new Array<ComponentBase>();
// 		}

// 		public Init():void
//         {
//             ArrayUtils.Clear(this.m_CompnentList);
//         }

//         public Setup(info:any):void
//         {
//         }

//         public Destroy():void
//         {
//             this.RemoveAllCompnent();
//         }
		
//         public Update():boolean
//         {    
// 			for(let c of this.m_CompnentList)
//             {
//                 if(c)c.Update();
//             }
//             return true;
//         }
		        
//         //～～～～～～～～～～～～～～～～～～～～～～～组件～～～～～～～～～～～～～～～～～～～～～～～//
//         public AddCompnent(classDef:any):ComponentBase
//         {
//             let c:ComponentBase = new classDef();
//             if(!c || c instanceof ComponentBase == false)
//             {
//                 Log.Error("组件创建失败，必须继承ComponentBase");
//                 return null;
//             }
//             c.Owner = this;
//             c.Start();
//             c.OnEnable();
//             return c;
//         }
// 		public RemoveCompnent(c:ComponentBase):void
// 		{
//             if(!c)return;
//             if(ArrayUtils.ContainsValue(this.m_CompnentList, c))
//             {
//                 c.OnDisable();
//                 c.OnDestroy();
//                 ArrayUtils.RemoveValue(this.m_CompnentList, c);
//             }
// 		}
// 		public RemoveAllCompnent():void
// 		{
// 			for(let c of this.m_CompnentList)
//             {
//                 if(c)
//                 {
//                     c.OnDisable();
//                     c.OnDestroy();
//                 }
//             }
//             ArrayUtils.Clear(this.m_CompnentList);
// 		}
// 	}
// }