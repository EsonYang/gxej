<?php
    header("Access-Control-Allow-Origin:*");
    /*
        username => 字段涵义 ; 前端发送给我的用户名信息;
    */
    //1.登陆;
    //2.注册;
    $usr = @$_POST["username"];
    $pwd = @$_POST["password"];
    $type = @$_POST["type"]; 
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!");
        die(json_encode($res));
    }
    require("./_connect.php");
    $pwd = md5($pwd);
    //根据不同情况进行不同判断;
    // echo $type;
    $sql_login = "SELECT username,userpwd FROM user_data";
   
    $sql_register = "INSERT user_data(
        username,userpwd
    )
        VALUES 
    ('{$usr}','{$pwd}')
    ";
    $result_login = $conn->query($sql_login);

    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = TRUE;
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["userpwd"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = TRUE;
                // echo $select_res;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE){
        die($select_res);
    }else if($type == "login"){
        die("0");
    }

    if($type == "register" && $hasuser == TRUE){
        //用户名重名; => 2;
        echo 2;
    }else if($hasuser == FALSE){
        //注册成功成功;
         if($type == "register"){
            $result_register = $conn->query($sql_register);
        }
        echo 1;
    }
?>