<%--
  Created by IntelliJ IDEA.
  User: wangxuekai
  Date: 2016-03-05
  Time: 14:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>歌曲列表</title>
    <link href="/css/manage.css" media="screen" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="table_box">
    <table class="list">
        <div>歌曲信息</div>
       <tbody>
        <tr>
            <th width="4%">id</th>
            <th width="35%">歌曲名</th>
            <th width="12%">艺人</th>
            <th width="12%">歌曲大小</th>
            <th width="20%">下载地址</th>
            <th width="12%">操作</th>
        </tr>
        <c:if test="${!empty songInfoList.list }">
        <jsp:useBean id="songInfo" class="com.jt.demo.SongInfo" />
            <c:forEach items="${songInfoList.list }" var="bean">
                <tr>
                    <td style="text-align: left;">
                        <c:out value="${bean.getMusicId() }" default=""></c:out>
                    </td>
                    <td style="text-align: left;">${bean.getSongName() }</td>
                    <td style="text-align: left;">${bean.getArtist() }</td>
                    <td style="text-align: left;">${bean.getMp3size() }</td>
                    <td style="text-align: left;">${bean.getMp3Url() }</td>
                    <td style="text-align: left;">
                        <audio src="${bean.getMp3Url()}" controls="controls"></audio>
                    </td>
                </tr>
            </c:forEach>
        </c:if>
        <c:if test="${empty songInfoList.list }">
            <tr>
                <td style="text-align:center;" colspan="3">
                    暂无数据记录！
                </td>
            </tr>
        </c:if>
        </tbody>
    </table>
<%--

    <c:set var="currentPage" value="${songInfoList.pageNumber }"/>
    <c:set var="totalPage" value="${songInfoList.totalPage }"/>
    <c:set var="actionUrl" value="/blog/"/>
    <c:set var="urlParas" value=""/>
--%>

    <%--<%@ include file="/common/_paginate.jsp"%>--%>
</div>
</body>
</html>
