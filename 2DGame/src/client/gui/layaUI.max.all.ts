
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import UIBaseView=dc.UIBaseView;
module client.gui.login {
    export class LoginViewUI extends UIBaseView {

        public static  uiView:any ={"type":"UIBaseView","props":{"width":600,"height":400},"child":[{"type":"Button","props":{"y":170,"x":273,"skin":"comp/button.png","label":"label"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(client.gui.login.LoginViewUI.uiView);
        }
    }
}
