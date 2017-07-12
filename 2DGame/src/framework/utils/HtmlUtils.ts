module dc
{
    /**
     * html工具类
     * @author hannibal
     * @time 20174-7-12
     */
	export class HtmlUtils
	{
    	public static CeateHTML(fontName:string, fontSize: number, fontColor: string, width: number, height: number, x:number = 0, y:number = 0): LayaHTMLDivElement
		{
			let html = new LayaHTMLDivElement();
			html.y = y;
			html.x = x;
			html.width = width;
			html.style.fontFamily = fontName;
			html.style.fontSize = fontSize;
			html.style.color = fontColor;
			html.style.bold = true;

			return html;
    	}
	}
}