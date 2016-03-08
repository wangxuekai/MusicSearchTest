var adverObj={
    "root":[]
};
adverObj.root.push({link:"http://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.6.sTB1Jn&id=43564842641&_u=k3b1jdpe530",img:"taobao/img/1.jpg",text:"2015春季新款韩国东大门女装毛呢潮流大衣大码毛呢加厚冬款外套"});
adverObj.root.push({link:"http://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.7.sTB1Jn&id=43529994813&_u=k3b1jdp75d0",img:"taobao/img/2.jpg",text:"2015春季新款纯色毛呢外套女装欧洲站呢子大衣女士潮款"});
adverObj.root.push({link:"http://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.8.sTB1Jn&id=43579120433&_u=k3b1jdp749c",img:"taobao/img/3.jpg",text:"2015春装韩版新款毛呢外套女中长款宽松格子呢子大衣"});
adverObj.root.push({link:"http://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.9.sTB1Jn&id=43505723874&_u=k3b1jdp96f2",img:"taobao/img/4.jpg",text:"2015春新款格子毛呢外套韩版宽松女士潮款呢子大衣"});
adverObj.root.push({link:"http://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.10.sTB1Jn&id=43572376526&_u=k3b1jdpce23",img:"taobao/img/5.jpg",text:"2015春季新款韩版中长款小西装女士宽松翻领小西服双排扣外套"});

function createTaobao(adverobj)
{
    var adHTML="";
     for(var i=0;i<adverobj.root.length;i++)
     {
         var obj=adverobj.root[i];
         var html= "<div class='taobao_img_box'>" +
             "<a class='taobao_link' target='_blank' href='"+
             obj.link+
             "'> <img class='taobao_img' src='"+
             obj.img+
             "' /> </a>"+
            "<div class='taobao_text_box'>"+
          	"<span class='taobao_text'>"+obj.text+"</span>"+
      		"</div>"+
             "</div>"
         adHTML+=html;
     }
    $(".taobao_container").html(adHTML);
}
createTaobao(adverObj);
$(".taobao_img_box").mouseenter(function(){
    var textBox=$(this).find(".taobao_text_box");
    textBox.animate({
        marginTop:-textBox.outerHeight()+"px"
    },400);

});
$(".taobao_img_box").mouseleave(function(){
    var textBox=$(this).find(".taobao_text_box");
    textBox.animate({
        marginTop:0+"px"
    },400);
});