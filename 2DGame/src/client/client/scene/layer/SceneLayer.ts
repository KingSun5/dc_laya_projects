module dc
{
    /**
     * 场景层级
     * @author hannibal
     * @time 2017-7-14
     */
	export class SceneLayerUtils
	{
		/**场景根容器*/
		private static m_sceneRootContainer:LayaSprite;	

		/**最高层*/
		private static m_topLevelContainer:LayaSprite;	
		/**特效*/
		private static m_effectLevelContainer:LayaSprite;
		/**玩家*/
		private static m_playerLevelContainer:LayaSprite;	
		/**角色 */
		private static m_roleLevelContainer:LayaSprite;		
		/**子弹*/
		private static m_bulletLevelContainer:LayaSprite;
		/**物品*/
		private static m_mapItemLevelContainer:LayaSprite;
		/**物件*/
		private static m_mapObjLevelContainer:LayaSprite;		
		/**地面特效*/
		private static m_terrainEffectLevelContainer:LayaSprite;
		/**地形*/
		private static m_terrainLevelContainer:LayaSprite;	
		
		public static Setup():void
		{
			this.m_sceneRootContainer = new LayaSprite();
			this.m_sceneRootContainer.name = "sceneRootContainer";
			this.m_sceneRootContainer.mouseEnabled = false;

			this.m_topLevelContainer = new LayaSprite();
			this.m_topLevelContainer.name = "topLevelContainer";
			this.m_topLevelContainer.mouseEnabled = false;
			this.m_effectLevelContainer = new LayaSprite();
			this.m_effectLevelContainer.name = "effectLevelContainer";
			this.m_effectLevelContainer.mouseEnabled = false;
			this.m_playerLevelContainer = new LayaSprite();
			this.m_playerLevelContainer.name = "playerLevelContainer";
			this.m_playerLevelContainer.mouseEnabled = false;
			this.m_roleLevelContainer = new LayaSprite();
			this.m_roleLevelContainer.name = "roleLevelContainer";
			this.m_roleLevelContainer.mouseEnabled = false;
			this.m_bulletLevelContainer = new LayaSprite();
			this.m_bulletLevelContainer.name = "bulletLevelContainer";
			this.m_bulletLevelContainer.mouseEnabled = false;
			this.m_mapItemLevelContainer = new LayaSprite();
			this.m_mapItemLevelContainer.name = "mapItemLevelContainer";
			this.m_mapItemLevelContainer.mouseEnabled = false;
			this.m_mapObjLevelContainer = new LayaSprite();
			this.m_mapObjLevelContainer.name = "mapObjLevelContainer";
			this.m_mapObjLevelContainer.mouseEnabled = false;
			this.m_terrainEffectLevelContainer = new LayaSprite();
			this.m_terrainEffectLevelContainer.name = "terrainEffectLevelContainer";
			this.m_terrainEffectLevelContainer.mouseEnabled = false;
			this.m_terrainLevelContainer = new LayaSprite();
			this.m_terrainLevelContainer.name = "terrainLevelContainer";
			this.m_terrainLevelContainer.mouseEnabled = false;
			
			LayerManager.gameLayer.addChild(this.m_sceneRootContainer);
			this.m_sceneRootContainer.addChild(this.m_terrainLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_terrainEffectLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_mapObjLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_mapItemLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_bulletLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_roleLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_playerLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_effectLevelContainer);
			this.m_sceneRootContainer.addChild(this.m_topLevelContainer);
		}	
		public static Destroy():void
		{
			DisplayUtils.RemoveAllChild(this.m_terrainLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_terrainEffectLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_mapObjLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_mapItemLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_bulletLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_roleLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_playerLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_effectLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_topLevelContainer);
			
			DisplayUtils.RemoveAllChild(this.m_sceneRootContainer);
			this.m_sceneRootContainer.removeSelf();

			this.m_sceneRootContainer = null;
			this.m_terrainLevelContainer = null;
			this.m_terrainEffectLevelContainer = null;
			this.m_mapObjLevelContainer = null;
			this.m_mapItemLevelContainer = null;
			this.m_bulletLevelContainer = null;
			this.m_roleLevelContainer = null;
			this.m_playerLevelContainer = null;
			this.m_effectLevelContainer = null;
			this.m_topLevelContainer = null;
		}
		public static Clear():void
		{
			DisplayUtils.RemoveAllChild(this.m_terrainLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_terrainEffectLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_mapObjLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_mapItemLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_bulletLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_roleLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_playerLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_effectLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_topLevelContainer);
		}
		public static get player():LayaSprite
		{
			return this.m_playerLevelContainer;
		}
		public static get role():LayaSprite
		{
			return this.m_roleLevelContainer;
		}
		public static get bullet():LayaSprite
		{
			return this.m_bulletLevelContainer;
		}
		public static get mapItem():LayaSprite
		{
			return this.m_mapItemLevelContainer;
		}
		public static get mapObj():LayaSprite
		{
			return this.m_mapObjLevelContainer;
		}
		public static get terrain():LayaSprite
		{
			return this.m_terrainLevelContainer;
		}
		public static get effect():LayaSprite
		{
			return this.m_effectLevelContainer;
		}
		public static get terrainEffect():LayaSprite
		{
			return this.m_terrainEffectLevelContainer;
		}
		public static get top():LayaSprite
		{
			return this.m_topLevelContainer;
		}
	}
}