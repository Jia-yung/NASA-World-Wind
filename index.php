<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--CDN stylesheets for bootstrap-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css>
    
    <!--Custom CSS-->
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/util.css">
</head>

<body>
    <?php include 'navigation.php';?>
  
    <div class="simpleslide100" style="background-size:100%;">
        <div class="simpleslide100-item bg-img1" style="background-image: url('images/polar1.jpg');"></div>
        <div class="simpleslide100-item bg-img1" style="background-image: url('images/ocean2.jpg');"></div>
        <div class="simpleslide100-item bg-img1" style="background-image: url('images/maldive.jpg');"></div>
        <div class="simpleslide100-item bg-img1" style="background-image: url('images/ice2.jpg');"></div>
	</div>
	<div class="flex-col-c-sb size1 overlay1">
		<div class="flex-col-c-m p-l-15 p-r-15 p-t-50 p-b-120">
			<h3 class="l1-txt1 txt-center p-b-40 respon1">
				NEXT CITY WILL SINK IN
			</h3>
			<div class="cd100 row">
				<div class=" wsize1 " style="padding-right:px;">
					<span class="l1-txt2 p-b-9 days">19</span>
					<span class="s1-txt1 where1 p-l-35">Years</span>
				</div>

				<div class="wsize1 ">
					<span class="l1-txt2 p-b-9 hours">23</span>
					<span class="s1-txt1 where1 p-l-35">Hours</span>
				</div>

				<div class=" wsize1">
					<span class="l1-txt2 p-b-9 minutes">59</span>
					<span class="s1-txt1 where1 p-l-35">Minutes</span>
				</div>

				<div class="wsize1">
					<span class="l1-txt2 p-b-9 seconds">59</span>
					<span class="s1-txt1 where1 p-l-35">Seconds</span>
                </div>
            </div>
            <div class="flex-col-c" style="padding-top:25px;">
                <a class="btn btn-outline-light btn btn-lg " href="visual.php" role="button">See the world</a>     
            </div>          
         </div>
    </div>
    <section style="background-color: white; padding: 60px; padding-left: 80px; padding-right: 80px">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <h1 class="text-center" style="margin-bottom: 20px">Mission</h1>                    
                    <p class="text-center">To help communicate the impacts of rising oceans to the public and to make changes to overcome consequences caused by global warming.</p>
                </div>
                <div class="col-sm-6">
                    <h1 class="text-center" style="margin-bottom: 20px">Vision</h1>
                    <p class="text-center">For the earth to be effectively protected from the global climate change and rising sea level around the world, managed and conserved for the benefit and appreciation of netizens on the earth.</p>
                </div>
            </div>
        </div>
    </section>
    <section style="background-color: #F2F3F4; padding: 60px; padding-left: 80px; padding-right: 80px">
        <div class="container-fluid"> 
            <div class="row justify-content-center">
                <div class="col-xs-12 text-center heading-section ftco-animate" style="margin-bottom: 40px">
                    <h2>Do you know?</h2>
                    <p style="color:grey; margin-top: 20px;">In the past decades, the coral islands and atolls that make up the Maldives start to sink into the Indian Ocean, and several reefs of the Solomon Islands vanish into South Pacific. If we continue adding carbon to the atmosphere, we will very likely to create an ice-free planet, with an average temperature of 80 degree Fahrenheit</p>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-12 col-xs-12 col-md-12 col-lg-4 col-xl-4">
                        <img src="images/poorpolar.jpeg" class="rounded-circle quote-image">
                    </div>
                    <div class="col-12 col-xs-12 col-md-12 col-lg-6 col-xl-8">
                        <blockquote style="color:grey; margin-top: 60px; margin-bottom: 60px;">My habitats are being destroyed and I have nothing to eat anymore, I'm hungry...</blockquote> 
                    </div>
                </div>   
                <div class="text-center">
                    <button type="button" class="btn btn-dark btn-lg">Save the earth now</button>
                </div>
            </div>
        </div>
    </section>
    
    <?php include 'footer.php';?>
   
    <!--===============================================================================================-->	
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
    <!--===============================================================================================-->
	<script src="vendor/countdowntime/moment.min.js"></script>
	<script src="vendor/countdowntime/moment-timezone.min.js"></script>
	<script src="vendor/countdowntime/moment-timezone-with-data.min.js"></script>
	<script src="vendor/countdowntime/countdowntime.js"></script>
	<script>
		$('.cd100').countdown100({
			/*Set Endtime here*/
			/*Endtime must be > current time*/
			endtimeYear: 0,
			endtimeMonth:0,
			endtimeDate: 19,
			endtimeHours: 24,
			endtimeMinutes: 60,
			endtimeSeconds: 60,
			timeZone: "" 
			// ex:  timeZone: "America/New_York"
			//go to " http://momentjs.com/timezone/ " to get timezone
		});
	</script>
    <script src="vendor/tilt/tilt.jquery.min.js"></script>
	<script >
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
    <!--===============================================================================================-->
    <script src="javascript/timer.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

   <!--popper and javascript plugin-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>    
</body>
</html>