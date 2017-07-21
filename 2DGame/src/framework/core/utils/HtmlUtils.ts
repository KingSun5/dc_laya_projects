module dc
{
    /**
     * html工具类
     * @author hannibal
     * @time 20174-7-12
     */
	export class HtmlUtils
	{
    	public static CreateHTML(fontSize: number, fontColor: string, width: number, height: number, x:number = 0, y:number = 0): LayaHTMLDivElement 
		{
			let html = new LayaHTMLDivElement();
			html.y = y;
			html.x = x;
			html.size(width, height);
			html.style.fontFamily = "黑体";//TODO
			html.style.fontSize = fontSize;
			html.style.color = fontColor;
			html.style.bold = true;

			return html;
		}
    	public static centerHtmlX(html: LayaHTMLDivElement) 
		{
			let parent = <LayaBox>html.parent;
			html.x = (parent.width - html.contextWidth) / 2;
		}

    	public static centerHtmlY(html: LayaHTMLDivElement) 
		{
			let parent = <LayaBox>html.parent;
			html.y = (parent.height - html.contextHeight) / 2;
    	}

    	public static centerHtml(html: LayaHTMLDivElement) 
		{
			let parent = <LayaBox>html.parent;
			html.x = (parent.width - html.width) / 2;
			html.y = (parent.height - html.height) / 2;
    	}		
	}
}