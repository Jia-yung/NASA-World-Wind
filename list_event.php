<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--CDN stylesheets for bootstrap-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/list_event.css">
    <link rel="stylesheet" href="css/custom.css">

</head>

<body>
    <?php include 'navigation.php';?>

    <div class="container">

        <div class="row">
            <div class="col-sm-12">
                <h1 class="news-text">Advertise your event here !</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
              
            <form style="border-radius: 10px; width: 100%;  margin-top: 0px;">
                <div class="titler">
                    <h3>Submit Your Events Here!</h3>
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
                <button type="button" class="button btn-info" style="border-radius: 5px; font-family: arial; font-weight: bold; width: 50%; margin-left: 335px;"><span class="fa fa-envelope" style="margin-right:5px;"></span>Submit Your Form Here!
                    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                </button>
                </form>
            </div>
            <div class="col-sm-4">
            <form style="border-radius: 10px;  margin-top: 0px;">
                <div class="titler">
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
                <div class="group" style="margin-bottom: 120px;">
                    <input type="email"><span class="highlight"></span><span class="bar"></span>
                    <label>Donations (RM)</label>
                </div>

                <button type="button" style="border-radius:5px ;color:white; font-family: arial; font-weight: bold;" class="button btn-warning"><span class="fa fa-paypal" style="margin-right: 5px;"></span>We Accept Paypal!
                    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                </button>

                <button type="button" class="button buttonBlue" style="margin-bottom: 85px; border-radius:5px; font-family: arial; font-weight:bold; "><span class="fa fa-umbrella" style="margin-right: 5px;"></span>Send Donations!
                    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                </button>
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

<script>
$(window, document, undefined).ready(function() {

$('input').blur(function() {
  var $this = $(this);
  if ($this.val())
    $this.addClass('used');
  else
    $this.removeClass('used');
});

var $ripples = $('.ripples');

$ripples.on('click.Ripples', function(e) {

  var $this = $(this);
  var $offset = $this.parent().offset();
  var $circle = $this.find('.ripplesCircle');

  var x = e.pageX - $offset.left;
  var y = e.pageY - $offset.top;

  $circle.css({
    top: y + 'px',
    left: x + 'px'
  });

  $this.addClass('is-active');

});

$ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
    $(this).removeClass('is-active');
});

});
</script>
</body>
</html>