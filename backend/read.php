<?php

    require 'dbconnection.php';
    header('Content-type: application/json');
	  header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
  
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    if ($data->_method) {

        switch ($data->_method) {
            case "getAllUsers":
                getAllUsers($conn);
                break;
            case "getUserById":
                getUserById($conn, $data->data);
                break;
            case "getModuels":
                getModuels($conn);
                break;
            default:
                echo "";
                break;
        }
    }

    function getAllUsers($conn) {
        $sql = "Select * From users";
        $result = mysqli_query($conn, $sql);
    
        $data =array();
    
        while($row = mysqli_fetch_array($result)){
            $data[] = $row;
        }
    
        echo json_encode($data);
    }

    function getUserById($conn, $data) {
        $sql = "Select * From users where id = $data";
        $result = mysqli_query($conn, $sql);
    
        $data =array();
    
        while($row = mysqli_fetch_array($result)){
            $data[] = $row;
        }
    
        echo json_encode($data);
    }

    function getModuels($conn) {
        $sql = "Select * From modues";
        $result = mysqli_query($conn, $sql);
    
        $data =array();
    
        while($row = mysqli_fetch_array($result)){
            $data[] = $row;
        }
    
        echo json_encode($data);
    }
  
?>
