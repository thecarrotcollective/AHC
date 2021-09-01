<?php
function insert_user($item) {
  global $db;

  $sql = "INSERT INTO userdata ";
  $sql .= "(phone, date)";
  $sql .= "VALUES (";
  $sql .= "'" . $item['phone'] . "', ";
  $sql .= " now() ";
  $sql .= ")";

  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  // For INSERT statements, $result is true/false
  if ($result) {
    return true;
  } else {
    // INSERT has failed
    echo mysqli_error($db);
    db_disconnect($db);
    exit;
  }
}

function find_users($limit){
  global $db;

  $sql = "SELECT * FROM userdata ";
  $sql .= "ORDER BY id ASC ";
  $sql .= "LIMIT ". $limit;
  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  return $result;
}


function validate_uuid($item) {
  $errors = [];
  // id
  if(!has_unique_uuid($item['uuid'])) {
    $errors[] = "UUID exists.";
  }

  return $errors;
}

function has_unique_uuid($uuid) {
  global $db;

  $sql = "SELECT * FROM analytics ";
  $sql .= "WHERE uuid='" . $uuid . "' ";

  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  $uuid_count = mysqli_num_rows($result);


  // mysqli_free_result($result);

  return $uuid_count === 0;
}

function uuid_exists($item){
  global $db;
  $errors = [];
  $sql = "SELECT * FROM analytics ";
  $sql .= "WHERE uuid='" . $item['uuid'] . "' LIMIT 15";

  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  $row = mysqli_fetch_assoc($result);

  if ($row['uuid'] == $item['uuid']){
    // uuid exists, UPDATE
    return true;
  } else {
    // uuid doesn't exist, INSERT
    return false;
  }

  mysqli_free_result($result);
}

// Admins

// Find all admins, ordered name
function find_all_admins() {
    global $db;

    $sql = "SELECT * FROM admins ";
    $sql .= "ORDER BY username ASC";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return $result;
}

function find_admin_by_id($id) {
    global $db;

    $sql = "SELECT * FROM admins ";
    $sql .= "WHERE id='" . db_escape($db, $id) . "'";
    $sql .= "LIMIT 1";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    $admin = mysqli_fetch_assoc($result); // find first
    mysqli_free_result($result);
    return $admin; // returns an assoc. array
}

function find_admin_by_username($username) {
    global $db;

    $sql = "SELECT * FROM admins ";
    $sql .= "WHERE username='" . db_escape($db, $username) . "' ";
    $sql .= "LIMIT 1";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    $admin = mysqli_fetch_assoc($result); // find first
    mysqli_free_result($result);
    return $admin; // returns an assoc. array
}

function validate_admin($admin) {
    if(is_blank($admin['username'])) {
        $errors[] = "Username cannot be blank.";
    } elseif (!has_length($admin['username'], array('min' => 6, 'max' => 255))) {
        $errors[] = "Username must be between 6 and 255 characters.";
    } elseif (!has_unique_username($admin['username'], $admin['id'] ?? 0)) {
        $errors[] = "Username not allowed. Try another.";
    }

    if(is_blank($admin['name'])) {
        $errors[] = "Name cannot be blank.";
    } elseif (!has_length($admin['name'], array('min' => 2, 'max' => 255))) {
        $errors[] = "Name must be between 2 and 255 characters.";
    }

    if(is_blank($admin['email'])) {
        $errors[] = "Email cannot be blank.";
    } elseif (!has_length($admin['email'], array('max' => 255))) {
        $errors[] = "Last name must be less than 255 characters.";
    } elseif (!has_valid_email_format($admin['email'])) {
        $errors[] = "Email must be a valid format.";
    }

    if(is_blank($admin['password'])) {
        $errors[] = "Password cannot be blank.";
    } elseif (!has_length($admin['password'], array('min' => 8))) {
        $errors[] = "Password must contain 8 or more characters";
    } elseif (!preg_match('/[A-Z]/', $admin['password'])) {
        $errors[] = "Password must contain at least 1 uppercase letter";
    } elseif (!preg_match('/[a-z]/', $admin['password'])) {
        $errors[] = "Password must contain at least 1 lowercase letter";
    } elseif (!preg_match('/[0-9]/', $admin['password'])) {
        $errors[] = "Password must contain at least 1 number";
    }
//    elseif (!preg_match('/[^A-Za-z0-9\s]/', $admin['password'])) {
//      $errors[] = "Password must contain at least 1 symbol";
//    }

    if(is_blank($admin['confirm_password'])) {
        $errors[] = "Confirm password cannot be blank.";
    } elseif ($admin['password'] !== $admin['confirm_password']) {
        $errors[] = "Password and confirm password must match.";
    }
    return $errors;
}

function insert_admin($admin) {
    global $db;

    $errors = validate_admin($admin);
    if (!empty($errors)) {
        return $errors;
    }

    $hashed_password = password_hash($admin['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO admins ";
    $sql .= "(name, email, username, hashed_password) ";
    $sql .= "VALUES (";
    $sql .= "'" . db_escape($db, $admin['name']) . "',";
    $sql .= "'" . db_escape($db, $admin['email']) . "',";
    $sql .= "'" . db_escape($db, $admin['username']) . "',";
    $sql .= "'" . db_escape($db, $hashed_password) . "'";
    $sql .= ")";
    $result = mysqli_query($db, $sql);

    // For INSERT statements, $result is true/false
    if($result) {
        return true;
    } else {
        // INSERT failed
        echo mysqli_error($db);
        db_disconnect($db);
        exit;
    }
}

function update_admin($admin) {
    global $db;

    $errors = validate_admin($admin);
    if (!empty($errors)) {
        return $errors;
    }

    $hashed_password = password_hash($admin['password'], PASSWORD_BCRYPT);

    $sql = "UPDATE admins SET ";
    $sql .= "name='" . db_escape($db, $admin['name']) . "', ";
    $sql .= "email='" . db_escape($db, $admin['email']) . "', ";
    $sql .= "hashed_password='" . db_escape($db, $hashed_password) . "',";
    $sql .= "username='" . db_escape($db, $admin['username']) . "' ";
    $sql .= "WHERE id='" . db_escape($db, $admin['id']) . "' ";
    $sql .= "LIMIT 1";
    $result = mysqli_query($db, $sql);

    // For UPDATE statements, $result is true/false
    if($result) {
        return true;
    } else {
        // UPDATE failed
        echo mysqli_error($db);
        db_disconnect($db);
        exit;
    }
}

function delete_admin($admin) {
    global $db;

    $sql = "DELETE FROM admins ";
    $sql .= "WHERE id='" . db_escape($db, $admin['id']) . "' ";
    $sql .= "LIMIT 1;";
    $result = mysqli_query($db, $sql);

    // For DELETE statements, $result is true/false
    if($result) {
        return true;
    } else {
        // DELETE failed
        echo mysqli_error($db);
        db_disconnect($db);
        exit;
    }
}

?>