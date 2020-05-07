window.addEventListener('load',()=>{

    const theory_div = new TimelineLite({paused:true}),
          features_div = new TimelineLite({paused:true}),
          features_nav = new TimelineLite({paused:true});

    theory_div.fromTo("#theory-div",0.25,{x:"-101%"},{x:"0%"});
    features_div.fromTo('#features-div',0.25,{x:"-101%"},{x:"0%"});
    features_nav.fromTo("#features-nav",0.3,{x:"-101%"},{x:"0%"});
    let left_nav_menu_able = true;

    let left_nav_el = document.getElementById('main-left-nav'),
        features_nav_el = document.getElementById('features-nav');

    document.getElementById('theory-container').addEventListener('mouseenter',()=>{
        if(left_nav_menu_able) theory_div.play();
    });
    document.getElementById('theory-container').addEventListener('mouseleave',()=>{
        if(left_nav_menu_able) theory_div.reverse();
    });
     document.getElementById('features-container').addEventListener('mouseenter',()=>{
        if(left_nav_menu_able) features_div.play();
    });
    document.getElementById('features-container').addEventListener('mouseleave',()=>{
        if(left_nav_menu_able) features_div.reverse();
    });

    document.getElementById('features-div').addEventListener('click',()=>{
        left_nav_menu_able = false
        features_div.reverse();
        left_nav_el.classList.add('d-none');
        features_nav_el.classList.remove('d-none');
        features_nav.play();
    });




});