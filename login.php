<?php
// http://localhost:8081/gxej/login.php
    require("./_connect.php");
    $username = @$_POST["user_name"];
    $pwd = @$_POST["user_pwd"];
    if($username == "" || $pwd == ""){
        //die("0");
    }
    $sql = "SELECT user_name,user_pwd FROM register";
    $result = $conn->query($sql);
    echo $result->num_rows;
?>