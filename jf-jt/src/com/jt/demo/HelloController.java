package com.jt.demo;

import com.jfinal.core.Controller;

/**
 * @author wangxuekai
 * @date 2016-03-04
 */
public class HelloController extends Controller {
    public void index(){
        renderText("Hello JFinal!");
    }
}
