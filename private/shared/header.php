<?php
    if(!isset($page_title)) { $page_title = 'AHC Spa Admin Page'; }
?>

<!doctype html>
<html lang="en">
<head>
    <title>QREAL -  <?php echo h($page_title); ?></title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" media="all" href="<?php echo url_for('styles.css');?>">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="<?php echo url_for('/index.php'); ?>">QReal - <?php echo h($page_title); ?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
    <!--                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
                    <a class="nav-link" href="<?php echo url_for('/index.php'); ?>">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href=<?php echo url_for('/new.php')?>>New Page</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">

                <?php
                if(isset($_SESSION['admin_id'])) {
                    $admin = find_admin_by_id($_SESSION['admin_id']);
                    if(is_admin($admin['admin'])){  ?>
                        <a class="nav-link" href=<?php echo url_for('/admins/index.php')?>>ADMIN</a>
                <?php } } ?>
                <?php if(is_logged_in()) { ?>
                    <span>User: <?php echo $_SESSION['username'] ?? ''; ?></span>
                    <a class="nav-link" href=<?php echo url_for('/logout.php')?>>Logout</a>
                <?php } else { ?>
                    <a class="nav-link" href=<?php echo url_for('/login.php')?>>Login</a>
                <?php } ?>

            </form>
        </div>
    </nav>

      <?php echo display_session_message(); ?>