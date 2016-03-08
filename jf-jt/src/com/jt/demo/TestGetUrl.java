package com.jt.demo;

import com.jfinal.plugin.activerecord.Page;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.io.StringReader;
import java.util.*;

/**
 * @author wangxuekai
 * @date 2016-02-29
 */
public class TestGetUrl {
    public void testGetFromUrl(){
        String url = "http://search.kuwo.cn/r.s?all=numbencore&ft=music&itemset=web_2013&client=kt&pn=0&rn=5&rformat=json&encoding=utf8";

        String responseBody = getResponseBody(url);
        Map result = toMap(responseBody);
        JSONArray jsonArray = (JSONArray) result.get("abslist");
        System.out.println(result.toString());
        System.out.println(jsonArray);
        for (Object aJsonArray : jsonArray) {
            JSONObject jsonObject1 = (JSONObject) aJsonArray;
            System.out.println(getSong(jsonObject1));
        }

    }

    public Page<SongInfo> search(String skey){
        List<SongInfo> songInfoList = new ArrayList<SongInfo>();
        String url = "http://search.kuwo.cn/r.s?all="+skey+"&ft=music&itemset=web_2013&client=kt&pn=0&rn=5&rformat=json&encoding=utf8";
        String responseBody = getResponseBody(url);
        Map result = toMap(responseBody);
        JSONArray jsonArray = (JSONArray) result.get("abslist");
        System.out.println(result.toString());
        System.out.println(jsonArray);
        for (Object aJsonArray : jsonArray) {
            JSONObject jsonObject1 = (JSONObject) aJsonArray;
            songInfoList.add(getSong(jsonObject1));
        }
        return new Page(songInfoList,songInfoList.size(),1,1,songInfoList.size());
    }

    /**
     * <Song>
     <music_id>100199</music_id>
     <mv_rid>MV_188122</mv_rid>
     <name>Numb / Encore</name>
     <song_url>http://yinyue.kuwo.cnhttp://yinyue.kuwo.cn/yy/gequ-JayZLinkinPark_NumbEncore/100199.htm</song_url>
     <artist>Jay-Z&Linkin Park</artist>
     <artid>1446</artid>
     <singer>Jay-Z</singer>
     <special>Collision Course</special>
     <ridmd591>1F64AB0F2C33512A18DF4D5B5E5E2DE5</ridmd591>
     <mp3size>7.83 MB</mp3size>
     <artist_url>http://yinyue.kuwo.cnhttp://yinyue.kuwo.cn/yy/geshou-JayZ/Jay-Z.htm</artist_url>
     <auther_url>http://www.kuwo.cn/mingxing/Jay-Z%26Linkin+Park/</auther_url>
     <playid>play?play=MQ==&num=MQ==&name0=TnVtYiAvIEVuY29yZQ==&artist0=SmF5LVomTGlua2luIFBhcms=&ssig10=MzkwNTExNjY4Nw==&ssig20=MjA2NzQyMzI0NA==&musicrid0=TVVTSUNfMTAwMTk5&mvrid0=TVZfMTg4MTIy&mp3size0=Ny44MyBNQg==&mrid0=TVAzXzEwMDE5OQ==&msig10=MTUxODAxMzE2Mg==&msig20=MzM1ODgxMTA1NQ==&mkvnsig10=MzAwMDk1MzQ5Mw==&mkvnsig20=MzgxNjMwMjYwNA==&mkvrid0=TVZfMzIxNzA=&mvsig10=Mjc3OTM4MTA1OA==&mvsig20=MjQ5NDY3OTMwNw==&size0=My4xNyBNQg==&album0=Q29sbGlzaW9uIENvdXJzZQ==&kalaok0=MA==&hasecho0=MA==&filetype0=c29uZw==&score0=Mg==&source0=aHR0cDovLzIyMi4zMy41Ni4xMDI6ODA4OS93bWEvbnYvd2FuZ2ZlaS9qaWFuZ2FpLzE1NTc3OTQ5OTcud21h&mvprovider0=&</playid>
     <artist_pic>http://img1.kuwo.cn/star/starheads/120/0/e37575446e8659caa9f2a3e298afc86_0.jpg</artist_pic>
     <artist_pic240>http://img1.kuwo.cn/star/starheads/240/7/16/1641590977.jpg</artist_pic240>
     <path>m2/5/78/1777727577.wma</path>
     <mp3path>n1/31/56/2183054088.mp3</mp3path>
     <aacpath>a1/34/50/1250005762.aac</aacpath>
     <wmadl>wmadl.cdn.kuwo.cn</wmadl>
     <mp3dl>other.web.rb01.sycdn.kuwo.cn</mp3dl>
     <aacdl>other.web.rb03.sycdn.kuwo.cn</aacdl>
     <lyric>DBYAHlReXEpRUEAeCgxVEgAORRgLG0MXCRgaCwoRAB5UAwEaBAkEBhwaXxcAHVReSAsMAVEkOj0wJjpdWV9fQFw=</lyric>
     <lyric_zz>DBYAHlReXEpRUEAeCgxVEgAORRgLG0MXCRgaCwoRAB5UAwEaBAkEBhwaXxcAHVReSAsMAVEkOj0wJjpdWV9fQFxDABsMFkRU</lyric_zz>
     </Song>
     * @param jsonObject
     * @return
     */
    public SongInfo getSong(JSONObject jsonObject){
        SongInfo songInfo = new SongInfo();
        String getDownUrl  =  "http://player.kuwo.cn/webmusic/st/getNewMuiseByRid?rid=";
        Map map = toMap(jsonObject);

        System.out.println(map.get("ARTIST").toString() +"\t" + map.get("SONGNAME").toString() +"\t"+ map.get("MUSICRID").toString());
        String responseBody = getResponseBody(getDownUrl + map.get("MUSICRID"));
        Map<String,String> resultMap = parseToMap(responseBody);
        String mp3Url = "http://"+resultMap.get("mp3dl")+"/resource/"+resultMap.get("mp3path");
        songInfo.setMusicId(resultMap.get("music_id"));
        songInfo.setSongName(resultMap.get("name"));
        songInfo.setArtist(resultMap.get("artist"));
        songInfo.setArtistId(resultMap.get("artid"));
        songInfo.setArtistPic(resultMap.get("artist_pic"));
        songInfo.setMp3size(resultMap.get("mp3size"));
        songInfo.setMp3Url(mp3Url);
        return  songInfo;
    }

    public Map parseToMap(String responseStrXml){
        responseStrXml = responseStrXml.replaceAll("&","&amp;");
        Map<String,String> resultMap = new HashMap<String, String>();
        SAXParserFactory saxfac = SAXParserFactory.newInstance();
        try {
            SAXParser saxparser = saxfac.newSAXParser();
            SAXHandler saxHandler = new SAXHandler();
            saxparser.parse(new InputSource(new StringReader(responseStrXml)), saxHandler);
            resultMap = saxHandler.getResultMap();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    public String getResponseBody(String url){
        String responseBody = null;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        try {
            CloseableHttpResponse httpResponse = httpClient.execute(httpGet);
            HttpEntity entity = httpResponse.getEntity();
            responseBody = EntityUtils.toString(entity,"UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return responseBody;
    }

    public Map toMap(String jsonString){
        return toMap(new JSONObject(jsonString));
    }

    public Map toMap(JSONObject jsObject){
        Map<String,Object> resultMap = new HashMap<String, Object>();
        Iterator<String> iterator = jsObject.keys();
        String key ;
        Object value;
        while (iterator.hasNext()){
            key = iterator.next();
            value = jsObject.get(key);
            resultMap.put(key,value);
        }
        return resultMap;
    }

    public void testXml(){
        String xmlStr = "<root><name>wxk&lpc</name><mobile>1827676677776</mobile></root>";
        xmlStr = xmlStr.replaceAll("&","&amp;");
        System.out.println(xmlStr);
        Map map = parseToMap(xmlStr);
        System.out.println(map.toString());
    }

}
