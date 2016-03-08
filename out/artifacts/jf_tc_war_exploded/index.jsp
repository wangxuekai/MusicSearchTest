<%--
  Created by IntelliJ IDEA.
  User: wangxuekai
  Date: 2016-03-04
  Time: 17:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
    <form action="${basePath}/sayHello" method="post">
      <input id = "searchParams" type = "text" size="40"  width="128" height="128"/>
      <input id = "searchBtn" type = "submit" value = "搜搜" >
    </form>
  </div>

  </body>
</html>
