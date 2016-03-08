package com.jt.demo;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wangxuekai
 * @date 2016-03-01
 */
public class SAXHandler extends DefaultHandler {
    private Map<String,String> resultMap;
    private String preTag = null;
    StringBuffer sb = new StringBuffer();

    @Override
    public void startDocument() throws SAXException {
        resultMap = new HashMap<String, String>();
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        sb.delete(0, sb.length());
        preTag = qName;
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {

        preTag = null;
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        if(preTag!=null){
            sb.append(ch,start,length);
            resultMap.put(preTag,sb.toString());
        }
    }

    public Map<String,String> getResultMap() {
        return resultMap;
    }
}
