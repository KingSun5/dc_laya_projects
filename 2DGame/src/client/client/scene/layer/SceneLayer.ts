module dc
{
    /**
     * 场景层级
     * @author hannibal
     * @time 2017-7-14
     */
	export class SceneLayers
	{
		/**场景根容器*/
		private static m_sceneRootContainer:LayaSprite;	

		/**最高层*/
		private static m_topContainer:LayaSprite;	
		/**特效*/
		private static m_effectContainer:LayaSprite;
		/**玩家*/
		private static m_playerContainer:LayaSprite;	
		/**角色 */
		private static m_roleContainer:LayaSprite;		
		/**子弹*/
		private static m_bulletContainer:LayaSprite;
		/**物品*/
		private static m_mapItemContainer:LayaSprite;
		/**物件*/
		private static m_mapObjContainer:LayaSprite;		
		/**地面特效*/
		private static m_terrainEffectContainer:LayaSprite;
		/**地形*/
		private static m_terrainContainer:LayaSprite;	
		
		public static Setup():void
		{
			this.m_sceneRootContainer = new LayaSprite();
			this.m_sceneRootContainer.name = "sceneRootContainer";
			this.m_sceneRootContainer.mouseEnabled = true;

			this.m_topContainer = new LayaSprite();
			this.m_topContainer.name = "topContainer";
			this.m_topContainer.mouseEnabled = false;
			this.m_effectContainer = new LayaSprite();
			this.m_effectContainer.name = "effectContainer";
			this.m_effectContainer.mouseEnabled = false;
			this.m_playerContainer = new LayaSprite();
			this.m_playerContainer.name = "playerContainer";
			this.m_playerContainer.mouseEnabled = true;
			this.m_roleContainer = new LayaSprite();
			this.m_roleContainer.name = "roleContainer";
			this.m_roleContainer.mouseEnabled = true;
			this.m_bulletContainer = new LayaSprite();
			this.m_bulletContainer.name = "bulletContainer";
			this.m_bulletContainer.mouseEnabled = false;
			this.m_mapItemContainer = new LayaSprite();
			this.m_mapItemContainer.name = "mapItemContainer";
			this.m_mapItemContainer.mouseEnabled = true;
			this.m_mapObjContainer = new LayaSprite();
			this.m_mapObjContainer.name = "mapObjContainer";
			this.m_mapObjContainer.mouseEnabled = true;
			this.m_terrainEffectContainer = new LayaSprite();
			this.m_terrainEffectContainer.name = "terrainEffectContainer";
			this.m_terrainEffectContainer.mouseEnabled = false;
			this.m_terrainContainer = new LayaSprite();
			this.m_terrainContainer.name = "terrainContainer";
			this.m_terrainContainer.mouseEnabled = true;
			
			LayerManager.gameLayer.addChild(this.m_sceneRootContainer);
			this.m_sceneRootContainer.addChild(this.m_terrainContainer);
			this.m_sceneRootContainer.addChild(this.m_terrainEffectContainer);
			this.m_sceneRootContainer.addChild(this.m_mapObjContainer);
			this.m_sceneRootContainer.addChild(this.m_mapItemContainer);
			this.m_sceneRootContainer.addChild(this.m_bulletContainer);
			this.m_sceneRootContainer.addChild(this.m_roleContainer);
			this.m_sceneRootContainer.addChild(this.m_playerContainer);
			this.m_sceneRootContainer.addChild(this.m_effectContainer);
			this.m_sceneRootContainer.addChild(this.m_topContainer);
		}	
		public static Destroy():void
		{
			DisplayUtils.RemoveAllChild(this.m_terrainContainer);
			DisplayUtils.RemoveAllChild(this.m_terrainEffectContainer);
			DisplayUtils.RemoveAllChild(this.m_mapObjContainer);
			DisplayUtils.RemoveAllChild(this.m_mapItemContainer);
			DisplayUtils.RemoveAllChild(this.m_bulletContainer);
			DisplayUtils.RemoveAllChild(this.m_roleContainer);
			DisplayUtils.RemoveAllChild(this.m_playerContainer);
			DisplayUtils.RemoveAllChild(this.m_effectContainer);
			DisplayUtils.RemoveAllChild(this.m_topContainer);
			
			DisplayUtils.RemoveAllChild(this.m_sceneRootContainer);
			this.m_sceneRootContainer.removeSelf();

			this.m_sceneRootContainer = null;
			this.m_terrainContainer = null;
			this.m_terrainEffectContainer = null;
			this.m_mapObjContainer = null;
			this.m_mapItemContainer = null;
			this.m_bulletContainer = null;
			this.m_roleContainer = null;
			this.m_playerContainer = null;
			this.m_effectContainer = null;
			this.m_topContainer = null;
		}
		public static Clear():void
		{
			DisplayUtils.RemoveAllChild(this.m_terrainContainer);
			DisplayUtils.RemoveAllChild(this.m_terrainEffectContainer);
			DisplayUtils.RemoveAllChild(this.m_mapObjContainer);
			DisplayUtils.RemoveAllChild(this.m_mapItemContainer);
			DisplayUtils.RemoveAllChild(this.m_bulletContainer);
			DisplayUtils.RemoveAllChild(this.m_roleContainer);
			DisplayUtils.RemoveAllChild(this.m_playerContainer);
			DisplayUtils.RemoveAllChild(this.m_effectContainer);
			DisplayUtils.RemoveAllChild(this.m_topContainer);
		}
		public static get player():LayaSprite
		{
			return this.m_playerContainer;
		}
		public static get role():LayaSprite
		{
			return this.m_roleContainer;
		}
		public static get bullet():LayaSprite
		{
			return this.m_bulletContainer;
		}
		public static get mapItem():LayaSprite
		{
			return this.m_mapItemContainer;
		}
		public static get mapObj():LayaSprite
		{
			return this.m_mapObjContainer;
		}
		public static get terrain():LayaSprite
		{
			return this.m_terrainContainer;
		}
		public static get effect():LayaSprite
		{
			return this.m_effectContainer;
		}
		public static get terrainEffect():LayaSprite
		{
			return this.m_terrainEffectContainer;
		}
		public static get top():LayaSprite
		{
			return this.m_topContainer;
		}
	}
}