<%--
  Created by IntelliJ IDEA.
  User: wangxuekai
  Date: 2016-03-04
  Time: 17:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <title>音乐搜索</title>
  <style type="text/css">
    #searchDIV{
      position:absolute;
      top:50px;
      right:500px;
    }
  </style>
  <script type="text/javascript">
    function search()
    {
      alert("您好！")
    }
  </script>
</head>
<body>
<div id = "searchDIV">
  <form action="${basePath}/search" method="post">

    <input id = "searchParams" name="sKey" type = "text" size="40"  width="128" height="128"/>
    <input id = "searchBtn" type = "submit" value = "搜搜">
  </form>
</div>
<%--<div>
  <span></span> <c:set var="pageNumber" scope="request" value="${appList.pageNumber}" />
  <c:set var="pageSize" scope="request" value="${appList.pageSize}" />
  <c:set var="totalPage" scope="request" value="${appList.totalPage}" />
  <c:set var="totalRow" scope="request" value="${appList.totalRow}" />
  <c:set var="pageUrl" scope="request" value="${contxt<span></span>}/appinfo/" />
  <tr>
    <td colspan="8"><jsp:include page="page/comm/page.jsp" /></td><!--使用JSP的include标签引入分页页面-->
  </tr> <span></span>
</div>--%>
  </body>
</html>
