    document.getElementById('begin').addEventListener('click', playClickSound);

    function playClickSound() {
        var clickSound = document.getElementById('clickSound');
        if (clickSound) {
            console.log('Attempting to play audio...');
            clickSound.play()
                .then(() => {
                    console.log('Audio played successfully.');
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        } else {
            console.error('Audio element not found!');
        }
    }

    //click icons
    function playClickSounds() {
        var clickSounds = document.getElementById('clickSounds');
        if (clickSounds) {
            console.log('Attempting to play audio...');
            clickSounds.play()
                .then(() => {
                    console.log('Audio played successfully.');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.error('Audio element not found!');
        }
    }
    //hover icons
    function playHoverSounds() {
        var hoverSounds = document.getElementById('hoverSound');
        if (hoverSounds) {
            console.log('Attempting to play audio...');
            hoverSounds.play()
                .then(() => {
                    console.log('Audio played successfully.');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.error('Audio element not found!');
        }
    }

    // **set initial screen number
        let screenNum = 1;

        // **total number of screens
        let totalScreens = $("section").length;

        // **transition duration
        let dur = .5;

        
        /**
         ** delay for starting screen animations
        ** make equal to duration... The time it takes content to transition off screen
        ** add more time to delay the build on a little more
        */
        let delay = dur + .5;
        // disables nav when transitioning from screen to screen
        let navActive = true;
        // vars used for nav
        let currentScreen, prevScreen, nextScreen;
        // hides all screens except for screen 1
        $("section:gt(0)").hide();
        // set up main div on paused timeline until begin button clicked
        let main = gsap.from("main", {
            duration: dur,
            opacity: 0
        }).pause();



        // set up begin button on paused timeline until page load
        let begin = gsap.from("#btnContainer", {
            duration: 1,
            opacity: 0,
            x: $(window).height(),
            opacity: 0,
            ease: "expo",
            onReverseComplete: function() {
                console.log("Reverse Complete");
                loadScreen1();
                // show the main div
                $("main").show();
                main.play();

                
            }

            
        }).pause();


        // preload all content and then reveal begin button
        $(window).on("load", function() {
            console.log("LOADED!");
            // fade out preloader GIF
            gsap.to("#loading", {
                duration: 1,
                opacity: 0,
                onComplete: function() {
                    $("#begin").show();
                    // when done show begin button
                    begin.play(); 
                    
                }
            });
        });

        // begin button click function
        $("#begin").click(function() {
            // console.log("BEGIN!");
            begin.reverse();
        });

        // next and previous navigation functions
        function showNextScreen(){
            // check if nav is active
            if(navActive){
                console.log("nextScreen");
                navActive = false;
                // ! Make sure you got that hashtag!
                // target the current
                currentScreen = "#screen" + screenNum;
                // set the next screen number 
                screenNum++;
                showHideNav(screenNum);
                // target the next screen
                nextScreen = "#screen" + screenNum;
                // transitions current screen out
                gsap.fromTo(currentScreen, {
                    x: 0
                }, {
                    duration: dur,
                    delay: 0.5,
                    x: -960,
                    ease: "power2.inOut"
                });
                // show next screen
                $(nextScreen).show();
                gsap.fromTo(nextScreen, {
                    x: 960
                }, {
                    duration: dur,
                    delay: 0.5,
                    x: 0,
                    ease: "power2.inOut",
                    onComplete: function() {
                        console.log("Next Screen Animation Finished");
                        // hide current screen
                        $(currentScreen).hide();
                        // re-enable nav
                        navActive = true;
                    }
                });

                // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
                // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
                // load function to animate conents of the screen
                // set up off screen
                window["loadScreen" + screenNum]();
            }
        }

        function showPrevScreen(){
            // check if nav is active
            if(navActive){
                console.log("prevScreen");
                navActive = false;
                // ! Make sure you got that hashtag!
                // target the current
                currentScreen = "#screen" + screenNum;
                // set the prev screen number 
                screenNum--;
                showHideNav(screenNum);
                // target the prev screen
                prevScreen = "#screen" + screenNum;
                // transitions current screen out
                gsap.fromTo(currentScreen, {
                    x: 0
                }, {
                    duration: dur,
                    delay: 0.5,
                    x: 960,
                    ease: "power2.inOut"
                });

                // show prev screen
                $(prevScreen).show();

                gsap.fromTo(prevScreen, {
                    x: -960
                }, {
                    duration: dur,
                    delay: 0.5,
                    x: 0,
                    ease: "power2.inOut",
                    onComplete: function() {
                        console.log("Prev Screen Animation Finished");
                        // hide current screen
                        $(currentScreen).hide();
                        // re-enable nav
                        navActive = true;
                    }
                });

                // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
                // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
                // load function to animate conents of the screen
                // set up off screen
                window["loadScreen" + screenNum]();
            
            }
        }
        // next and previous button clicks
        $("#next").click(showNextScreen);
        $("#prev").click(showPrevScreen);
        // show/hide next/prev buttons
        function showHideNav(currentScreen) {
            console.log("showHideNav reached");
            if(currentScreen == 1) {
                console.log("should show just the next");
                $("#prev").fadeOut(1000);
                $("#next").fadeIn(1000);
            } else if(currentScreen == totalScreens) {
                console.log("should show just the prev")
                $("#prev").fadeIn(1000);
                $("#next").fadeOut(1000);
            }
            else {
                console.log("show all nav")
                $("#prev").fadeIn(1000);
                $("#next").fadeIn(1000);
            }

        }

        // set up nav on page load
        showHideNav(screenNum);

        // functions for loading on content of each screen
        // LOAD SCREEN 1 ///////////////////////////////////////////////
        function loadScreen1() {


            gsap.to(".brain", {
                duration: 2,
                delay: 0.5,
                scale: 1.1,
                yoyo: true,
                repeat: -1,
                ease: "slow(0.7, 0.7, false)", 
            });

            gsap.from(".human", {
                duration: 2,
                delay: 1,
                x: 700,
                ease: "elastic(1, 0.7)",
            });

            gsap.from(".cap", {
                duration: 2,
                delay: 2,
                x: 700,
                ease: "elastic(1, 0.7)",
            });
            gsap.from(".begin1", {
                duration: 2,
                delay: 4,
                y: 700,
                ease: "elastic(1, 0.9)",
            });
        }


        // LOAD SCREEN 2 ///////////////////////////////////////////////
        function loadScreen2() {
            $("#ele9").click(function() {
                    
                gsap.fromTo("#bar1", {
                    height: 5
                }, {
                    duration: dur,
                    height: 120,
                    ease: "power2.out"
                });

                gsap.fromTo("#bar2", {
                    height: 5
                }, {
                    duration: dur,
                    height: 100,
                    ease: "power2.out"
                });
            });

            gsap.from(".robot1", {
                duration: 1.2,
                delay: delay +.8,
                left: -960,
                ease: "power3.out"
            });
            gsap.from("#ele9", {
                duration: 1.2,
                delay: delay +.2,
                bottom: -960,
                ease: "power3.out"
            });
            gsap.from("#ele8", {
                duration: 1.2,
                delay: delay +.2,
                bottom: -960,
                ease: "power3.out"
            });
            gsap.from("#ele10", {
                duration: 1.2,
                delay: delay +.2,
                bottom: -960,
                ease: "power3.out"
            });
            gsap.from(".memory", {
                duration: 1.2,
                delay: delay +.2,
                top: -960,
                ease: "power3.out"
            });
            gsap.from(".hoverlegend", {
                duration: 1.2,
                delay: delay +1.2,
                right: -960,
                ease: "power3.out"
            });
            gsap.from(".long", {
                duration: 1.2,
                delay: delay +.2,
                top: -960,
                ease: "power3.out"
            });
            gsap.from(".rect", {
                duration: 1.2,
                delay: delay +.5,
                right: -960,
                ease: "power3.out"
            });
            gsap.from(".number", {
                duration: 1.2,
                delay: delay +.5,
                top: -960,
                ease: "power3.out"
            });
            gsap.from(".short", {
                duration: 1.2,
                delay: delay +.2,
                top: -960,
                ease: "power3.out"
            });
            gsap.from(".tri3", {
                duration: 1.2,
                delay: delay +.2,
                top: 960,
                ease: "power3.out"
            });
            gsap.from(".tri2", {
                duration: 1.2,
                delay: delay +.2,
                top: 960,
                ease: "power3.out"
            });
            gsap.from(".tri1", {
                duration: 1.2,
                delay: delay +.2,
                top: 960,
                ease: "power3.out"
            });

            $("#ele8").hover(function() {
                console.log("Hover On!")
                gsap.to("#ele8hover", {
                    duration: 0.5,
                    right: 500,
                    ease: "power2.out",
                    
                });

            }, function() {
                console.log("Hover Off!");
                gsap.to("#ele8hover ", {
                    duration: 0.5,
                    right: -600,

                    ease: "power2.in"
                });

            });
        

            $("#ele10").hover(function() {
                console.log("Hover On!")
                gsap.to("#ele10hover", {
                    duration: 0.5,
                    bottom: 900,
                    ease: "power2.out",
                    
                });

            }, function() {
                console.log("Hover Off!");
                gsap.to("#ele10hover ", {
                    duration: 0.5,
                    bottom: -600,

                    ease: "power2.in"
                });

            });
        
        }

        // LOAD SCREEN 3 ///////////////////////////////////////////////
        function loadScreen3() {
            gsap.from(".bot3", {
                duration: 1.2,
                delay: delay +.8,
                right: -960,
                ease: "power3.out"
            });

            gsap.from("#ele11", {
                duration: 1.2,
                delay: delay +.8,
                top: -960,
                ease: "power3.out"
            });

            gsap.from(".title3", {
                duration: 1.2,
                delay: delay +.8,
                top: -960,
                ease: "power3.out"
            });

            gsap.from("#ele7", {
                duration: 2.2,
                delay: delay +.8,
                left: -960,
                ease: "power3.out"
            });
            gsap.from("#ele6", {
                duration: 2.,
                delay: delay +.8,
                left: -960,
                ease: "power3.out"
            });
            gsap.from("#ele4", {
                duration: 1.8,
                delay: delay +.8,
                left: -960,
                ease: "power3.out"
            });
            gsap.from("#ele5", {
                duration: 1.6,
                delay: delay +.8,
                left: -960,
                ease: "power3.out"
            });

            gsap.from(".mainbrain", {
                left: -700,
                duration: 1, 
                delay:1,
                });
            gsap.from(".brain1", {
                left: -700,
                duration: 1, 
                delay:1,
                });
            gsap.from(".brain2", {
                left: -700,
                duration: 1, 
                delay:1,
                });
            gsap.from(".brain3", {
                left: -700,
                duration: 1, 
                delay:1,
                });
            gsap.from(".brain4", {
                left: -700,
                duration: 1, 
                delay:1,
                });

            //emotions on brain 
            const emotions = document.querySelectorAll('.fear, .anger, .sad, .happy');

            function showEmotion(emotion) {
            gsap.to(`.${emotion}`, { opacity: 1, duration: 0.5 });
            }
        
            function hideEmotions() {
            gsap.to(emotions, { opacity: 0, duration: 0.5 });
            }
        
            const brainImages = document.querySelectorAll('.brain1, .brain2, .brain3, .brain4');
        
            brainImages.forEach(brain => {
            brain.addEventListener('mouseenter', () => {
                hideEmotions();
                showEmotion(brain.classList[0].toLowerCase());
            });
            });
        
            //hide show
            window.showEmotion = showEmotion;
            window.hideEmotions = hideEmotions;

            $("#ele11").hover(function() {
                console.log("Hover On!")
                gsap.to("#ele11hover", {
                    duration: 0.5,
                    right: 100,
                    ease: "power2.out",
                    
                });

            }, function() {
                console.log("Hover Off!");
                gsap.to("#ele11hover ", {
                    duration: 0.5,
                    right: -600,

                    ease: "power2.in"
                });

            });
            gsap.from(".hoverlegend3", {
                duration: 1.2,
                delay: delay +.2,
                right: -960,
                ease: "power3.out"
            });
        }


        // LOAD SCREEN 4 ///////////////////////////////////////////////
        function loadScreen4() {


        gsap.from(".love", {
            duration: 1.2,
            delay: delay +.2,
            top: -960,
            ease: "power3.out"
        });

        gsap.from(".ele1", {
            duration: 1.2,
            delay: delay +.21,
            left: -960,
            ease: "power3.out"
        });
        gsap.from("#ele12", {
            duration: 1.2,
            delay: delay +.23,
            left: -960,
            ease: "power3.out"
        });
        gsap.from("#ele13", {
            duration: 1.2,
            delay: delay +.22,
            left: -960,
            ease: "power3.out"
        });

        gsap.from(".hoverlegend4", {
            duration: 1.2,
            delay: delay +.2,
            top: -960,
            ease: "power3.out"
        });
        gsap.from(".bot4", {
            duration: 1.2,
            delay: delay +.2,
            left: -960,
            ease: "power3.out"
        });
        gsap.from(".title4", {
            duration: 1.2,
            delay: delay +.2,
            top: -960,
            ease: "power3.out"
        });


        $("#ele12").hover(function() {
            console.log("Hover On!")
            gsap.to("#ele12hover", {
                duration: 0.5,
                bottom: -800,
                ease: "power2.out",
                
            });

        }, function() {
            console.log("Hover Off!");
            gsap.to("#ele12hover ", {
                duration: 0.5,
                bottom: -100,

                ease: "power2.in"
            });

        });
        $("#ele13").hover(function() {
            console.log("Hover On!")
            gsap.to("#ele13hover", {
                duration: 0.5,
                bottom: -800,
                ease: "power2.out",
                
            });

        }, function() {
            console.log("Hover Off!");
            gsap.to("#ele13hover ", {
                duration: 0.5,
                bottom: -100,

                ease: "power2.in"
            });

        });

            //heart gif 
            const hearts = document.querySelectorAll('.hearts');

            function showHeart(hearts) {
                gsap.to(`.${hearts}`, { opacity: 1, duration: 0.5 });
                }
            
                function hideHeart() {
                gsap.to(hearts, { opacity: 0, duration: 0.5 });
                }
            
                const heartImages = document.querySelectorAll('.ele1');
            
                heartImages.forEach(hearts => {
                hearts.addEventListener('mouseenter', () => {
                    hideHeart();
                    showHeart(hearts.classList[0].toLowerCase());
                });
                });
            
            //hide show
            window.showHearts = showHeart;
            window.hideHearts = hideHeart;


        }


        // LOAD SCREEN 5 ///////////////////////////////////////////////
        function loadScreen5() {
            gsap.from(".bot5", {
                duration: 1.2,
                delay: delay +.2,
                left: -960,
                ease: "power3.out"
            });

            gsap.from(".title5", {
                duration: 1.2,
                delay: delay +1,
                top: -960,
                ease: "power3.out"
            });
            gsap.from(".quote", {
                duration: 1.2,
                delay: delay +.5,
                right: -660,
                ease: "power3.out"
            });
            

            gsap.fromTo(".floater3, .floater2", {
                x: 300,
                opacity: 0,
                delay: 1 
            }, {
                x: 0,
                opacity: 1,
                duration: 3
            });

            //sadgirl gif opacity clicking events
            const sads = document.querySelectorAll('.sads');

            function showSad(sads) {
                gsap.to(`.${sads}`, { opacity: 1, duration: 0.5 });
                }
            
                function hideSad() {
                gsap.to(sads, { opacity: 0, duration: 0.5 });
                }
            
                const sadImages = document.querySelectorAll('.ele2');
            
                sadImages.forEach(sads => {
                sads.addEventListener('mouseenter', () => {
                    hideSad();
                    showSad(hearts.classList[0].toLowerCase());
                });
                });
            
            //hide show
            window.showSad = showSad;
            window.hideSads = hideSad;

            gsap.from(".hoverlegend6", {
                duration: 1.2,
                delay: delay +.2,
                top: -960,
                ease: "power3.out"
            });


        }

        // LOAD SCREEN 6 ///////////////////////////////////////////////
        function loadScreen6() {

            gsap.from(".sometimes", {
                duration: 1.2,
                delay: delay +.2,
                top: -960,
                ease: "power3.out"
            });

            gsap.from(".itfeels", {
                duration: 1.2,
                delay: delay +.7,
                left: -760,
                ease: "power3.out"
            });

            gsap.from(".likeour", {
                duration: 1.2,
                delay: delay +1.2,
                left: -760,
                ease: "power3.out"
            });
            gsap.from(".explode", {
                duration: 0.5, 
                delay: delay + 3,
                scale: 0, 
                ease: "power3.out"
            });
            gsap.from(".cant", {
                duration: 1.2,
                delay: delay +4.2,
                left: -760,
                ease: "power3.out"
            });
            gsap.from(".just", {
                duration: 1.2,
                delay: delay +4.0,
                left: -760,
                ease: "power3.out"
            });
            gsap.fromTo(".breathe", {
                opacity: 0,
                scale: 1,
            }, {
                opacity: 1,
                duration: 2,
                scale: 1.1,
                yoyo: true,
                repeat: -1, 
                ease: "slow(0.7, 0.7, false)",
                delay: delay + 5.5, 
            });
        }

        // LOAD SCREEN 7 ///////////////////////////////////////////////
        function loadScreen7() {




        }