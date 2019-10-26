<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <!--CDN stylesheets for bootstrap-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <!--Custom CSS-->
    <link rel="stylesheet" href="css/advrt_event.css">
</head>

<body>
    <?php include 'navigation.php';?>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="advertise-title">Advertise your event here !</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12 col-lg-8">          
                <form class="event-form">
                    <div class="sub-title">
                        <h3>Events Submission</h3>
                    </div>
                    <div class="group">
                        <input type="text"><span class="highlight"></span><span class="bar"></span>
                        <label>Organisation Name</label>
                    </div>
                    <div class="group">
                        <input type="email"><span class="highlight"></span><span class="bar"></span>
                        <label>Email</label>
                    </div>
                    <div class="group">
                        <input type="email"><span class="highlight"></span><span class="bar"></span>
                        <label>Event Name</label>
                    </div>
                    <div class="group">
                        <input type="email"><span class="highlight"></span><span class="bar"></span>
                        <label>Message</label>
                    </div>
                    <div class="group">
                        <h6 style="color:#999; margin-left: 3px;">Upload Files</h6>
                        <input type="file" name="pic" accept="image/*" >
                    </div>
                    <div>
                        <button type="button" class="button btn-info submit-button float-right" style=""><span class="fa fa-envelope" style="margin-right:5px;"></span>Submit Your Form Here!</button>
                    </div>                 
                </form>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
                <form class="donation-form">
                    <div class="sub-title">
                        <h3>Donations</h3>
                    </div>
                    <div class="group">
                        <input type="text"><span class="highlight"></span><span class="bar"></span>
                        <label>Name</label>
                    </div>
                    <div class="group">
                        <input type="email"><span class="highlight"></span><span class="bar"></span>
                        <label>Email</label>
                    </div>
                    <div class="group" style="margin-bottom: 50px;">
                        <input type="email"><span class="highlight"></span><span class="bar"></span>
                        <label>Donations (RM)</label>
                    </div>
                    <div>
                        <button type="button" class="button buttonBlue donation-button" ><span class="fa fa-umbrella" style="margin-right: 5px;"></span>Send Donations!</button>
                    </div>                    
                </form>
            </div>
        </div>
    </div>
    <?php include 'footer.php';?>

    <!--jQuery-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!--popper and javascript plugin-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
</body>
</html>