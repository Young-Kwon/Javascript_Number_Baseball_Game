// Young Sang Kwon, 000847777, Assignment 4, Number Baseball Game
window.addEventListener("load", function() {
    // Initial state
    let idCheck = false; // valid id check
    let win = 0;         // save win number
    let lose = 0;        // save lose number
    let gameReady = false; 
    let count = 0;      // how many chance
    let ans = [[],[],[]];  // answer of game

    readyToPlay(); // Ready to play

    // Event listener
    document.querySelector('#startGame').addEventListener('click', idInput);
    document.querySelector('#submit').addEventListener('click', playingGame);
    document.querySelector('#restart').addEventListener('click', readyToPlay);
    document.querySelector('.user').addEventListener('mouseover', nameRuleOn);    
    document.querySelector('.user').addEventListener('mouseout', nameRuleOff);

    // function: check valid ID
    function idInput() {
        if ( idCheck == true ) { // user name can not change.
            document.getElementById("userError").innerHTML = "You are already logged in.";
            document.getElementById("userError").style.color = "blue";
        }
        else {
            let user = document.querySelectorAll('.user');
            console.log("User Name is", user[0].value, user[0].value[0], user[0].value.length);
            document.getElementById("userError").style.color = "red";
            
            if (user[0].value.length < 4 || user[0].value.length > 8 ) { // check user name length
                console.log("Error: Username must be between 4 and 8 characters.");
                document.getElementById("userError").innerHTML = "Error: Username must be between 4 and 8 characters.";
            }
            else if ( !isLetter(user[0].value.toUpperCase()) ) { // check user name if letter or not
                console.log("Error: Username must be letters only.");
                document.getElementById("userError").innerHTML = "Error: Username must be letters only.";
            }
            else if( !((user[0].value[0] >= 'A') && (user[0].value[0] <= 'Z')) ) { // check first letter of user name
                console.log("Error: Username must start with an uppercase letter.");
                document.getElementById("userError").innerHTML = "Error: Username must start with an uppercase letter.";
            }
            else if(!isAlphaIncr(user[0].value.toUpperCase()) ) { // check alphabetical of user name 
                console.log("Error: Username must be alphabetically bigger than the letter before.");
                document.getElementById("userError").innerHTML = "Error: Username must be alphabetically bigger than the letter before.";
            }
            else { // valid user name
                console.log("User name is correct. You can play game now");
                document.getElementById("userError").innerHTML = "User name is correct. You can play game now";
                document.getElementById("userError").style.color = "blue";
                idCheck = true;
            }
        }
    }

    // function: Ready to Play
    function readyToPlay() {
        console.log("Aswer is");                            
        for(let i=0; i<3; i++) { // Duplicate number checking in Answer
            let duplicate = 0;
            ans[i].value = Math.floor(Math.random() * 10); // random value is 0 ~ 9 in integer.
            console.log(ans[i].value);
            do {
                console.log(ans[0].value, ans[1].value, ans[2].value)
                if  ( i == 1 && (ans[i].value == ans[i-1].value) || ( i ==2 && ((ans[i].value == ans[i-1].value) || (ans[i].value == ans[i-2].value))) ) {
                    duplicate = 1;
                    ans[i].value = Math.floor(Math.random() * 10);
                }
                else {
                    duplicate = 0;
                }
            } while(duplicate); 
        }
        document.getElementById("bso1").innerHTML = "";
        document.getElementById("bso2").innerHTML = "";
        document.getElementById("bso3").innerHTML = "";
        document.getElementById("bso4").innerHTML = "";
        document.getElementById("bso5").innerHTML = "";
        document.getElementById("bso6").innerHTML = "";
        document.getElementById("bso7").innerHTML = "";
        document.getElementById("bso8").innerHTML = "";
        document.getElementById("bso9").innerHTML = "";
        document.getElementById("bso1").style.backgroundColor = "khaki"
        document.getElementById("bso2").style.backgroundColor = "khaki"
        document.getElementById("bso3").style.backgroundColor = "khaki"
        document.getElementById("bso4").style.backgroundColor = "khaki"
        document.getElementById("bso5").style.backgroundColor = "khaki"
        document.getElementById("bso6").style.backgroundColor = "khaki"
        document.getElementById("bso7").style.backgroundColor = "khaki"
        document.getElementById("bso8").style.backgroundColor = "khaki"
        document.getElementById("bso9").style.backgroundColor = "khaki"
        gameReady = true;
        count = 0; // count if count is over 9 or not
        let input = document.querySelectorAll('.input');
        for (let m=0; m<3; m++) {
            input[m].value = ''
        }
        document.getElementById("result").innerHTML = "";
    }

    // function: Playing game
    function playingGame() {
        if (idCheck == true && gameReady == true) { // check if game start or not
            let str=0, bal=0, out=0;
            let input = document.querySelectorAll('.input');

            console.log("Input is", input[0].value, input[1].value, input[2].value);
            if ( isNaN(input[0].value) || isNaN(input[1].value) || isNaN(input[2].value) ) { // letter checking
                document.getElementById("result").innerHTML = "Please input only number(0~9)";
            }
            else if ( (input[0].value == input[1].value) 
            || (input[0].value == input[2].value) 
            || (input[1].value == input[2].value) ) { // duplicate number checking
                console.log("Duplicate number is invalid.");
                document.getElementById("result").innerHTML = "Duplicate number is invalid.";
            }
            else if ( input[0].value < 0 || input[0].value > 9 
                || input[1].value < 0 || input[1].value > 9 
                || input[2].value < 0 || input[2].value > 9){ // single digit checking
                console.log("You can input 0 to 9 only");
                document.getElementById("result").innerHTML = "You can input only 0 to 9.";
            }
            else {
                console.log("count: ", count);
                for (let k=0; k<3; k++) {
                    console.log(input[k].value)
                    if(input[k].value == ans[k].value) { // count strike
                        str += 1;
                    }
                    else { // count ball
                        if ( k == 0 && ( (input[0].value == ans[1].value) || (input[0].value == ans[2].value) ) ) {
                            bal += 1;
                        }
                        else if ( k == 1 && ( (input[1].value == ans[0].value) || (input[1].value == ans[2].value) ) ) {
                            bal += 1;
                        }
                        else if ( k == 2 && ( (input[2].value == ans[0].value) || (input[2].value == ans[1].value) ) ) {
                            bal += 1;
                        }
                    }
                    input[k].classList.remove('.input');
                }
                if (str == 0 && bal == 0) { // out
                    out = 3;
                }
                else {
                    out = 0;
                }
                console.log(str, bal, out);
            
                if (out == 3) {// for out
                    switch(count) {
                        case 0:
                            document.getElementById("bso1").innerHTML = "Inn 1: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso1").style.backgroundColor = "yellow"
                            break;
                        case 1:
                            document.getElementById("bso2").innerHTML = "Inn 2: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso1").style.backgroundColor = "khaki"
                            document.getElementById("bso2").style.backgroundColor = "yellow"
                            break;
                        case 2:
                            document.getElementById("bso3").innerHTML = "Inn 3: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso2").style.backgroundColor = "khaki"
                            document.getElementById("bso3").style.backgroundColor = "yellow"
                            break;
                        case 3:
                            document.getElementById("bso4").innerHTML = "Inn 4: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso3").style.backgroundColor = "khaki"
                            document.getElementById("bso4").style.backgroundColor = "yellow"
                            break;
                        case 4:
                            document.getElementById("bso5").innerHTML = "Inn 5: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso4").style.backgroundColor = "khaki"
                            document.getElementById("bso5").style.backgroundColor = "yellow"
                            break;
                        case 5:
                            document.getElementById("bso6").innerHTML = "Inn 6: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso5").style.backgroundColor = "khaki"
                            document.getElementById("bso6").style.backgroundColor = "yellow"
                            break;
                        case 6:
                            document.getElementById("bso7").innerHTML = "Inn 7: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso6").style.backgroundColor = "khaki"
                            document.getElementById("bso7").style.backgroundColor = "yellow"
                            break;
                        case 7:
                            document.getElementById("bso8").innerHTML = "Inn 8: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso7").style.backgroundColor = "khaki"
                            document.getElementById("bso8").style.backgroundColor = "yellow"
                            break;
                        case 8:
                            document.getElementById("bso9").innerHTML = "Inn 9: " + input[0].value + input[1].value + input[2].value + " → " + out + "Out";
                            document.getElementById("bso8").style.backgroundColor = "khaki"
                            document.getElementById("bso9").style.backgroundColor = "yellow"
                            break;
                        default:
                            break;
                    }
                }
                else { // for ball and strike
                    switch(count) {
                        case 0:
                            document.getElementById("bso1").innerHTML = "Inn 1: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso1").style.backgroundColor = "yellow"
                            break;
                        case 1:
                            document.getElementById("bso2").innerHTML = "Inn 2: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso1").style.backgroundColor = "khaki"
                            document.getElementById("bso2").style.backgroundColor = "yellow"
                            break;
                        case 2:
                            document.getElementById("bso3").innerHTML = "Inn 3: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";;
                            document.getElementById("bso2").style.backgroundColor = "khaki"
                            document.getElementById("bso3").style.backgroundColor = "yellow"
                            break;
                        case 3:
                            document.getElementById("bso4").innerHTML = "Inn 4: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso3").style.backgroundColor = "khaki"
                            document.getElementById("bso4").style.backgroundColor = "yellow"
                            break;
                        case 4:
                            document.getElementById("bso5").innerHTML = "Inn 5: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso4").style.backgroundColor = "khaki"
                            document.getElementById("bso5").style.backgroundColor = "yellow"
                            break;
                        case 5:
                            document.getElementById("bso6").innerHTML = "Inn 6: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso5").style.backgroundColor = "khaki"
                            document.getElementById("bso6").style.backgroundColor = "yellow"
                            break;
                        case 6:
                            document.getElementById("bso7").innerHTML = "Inn 7: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso6").style.backgroundColor = "khaki"
                            document.getElementById("bso7").style.backgroundColor = "yellow"
                            break;
                        case 7:
                            document.getElementById("bso8").innerHTML = "Inn 8: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso7").style.backgroundColor = "khaki"
                            document.getElementById("bso8").style.backgroundColor = "yellow"
                            break;
                        case 8:
                            document.getElementById("bso9").innerHTML = "Inn 9: " + input[0].value + input[1].value + input[2].value + " → " + bal + "Ball, " + str + "Strike";
                            document.getElementById("bso8").style.backgroundColor = "khaki"
                            document.getElementById("bso9").style.backgroundColor = "yellow"
                            break;
                        default:
                            break;
                    }
                }
    
                count += 1;
                if( str == 3 ) { // win
                    gameOver(count, str);
                }
                else if( count == 9) { // lose
                    gameOver(count, str);
                }
                else {
                    document.getElementById("result").innerHTML = "You remain " + (9-count);
                }
            }
            for (let m=0; m<3; m++) {
                input[m].value = ''
            }
        }
        else if ( idCheck == false ) { // id check
            console.log("id is invalid")
            document.getElementById("result").innerHTML = "Please enter User name first.";
        }
        else if ( gameReady == false) { // game Ready check
            console.log("if you want to restart playing game. please push Restart button.")
            document.getElementById("result").innerHTML = "if you want to restart playing game. please push Restart button.";
        }
        document.getElementById("record").innerHTML = "Win: " + win + ", Lose: " + lose;
    }

    // function: Game over
    function gameOver(count, str) {
        if( str == 3 ) { // win
            console.log("You win"); 
            document.getElementById("result").innerHTML = "You Win: You succeeded on the " + count + "th.";
            win += 1;
        }
        else if( count == 9) { // lose
            console.log("You lose"); 
            document.getElementById("result").innerHTML = "You Lost: " + "Answer is " + ans[0].value + ans[1].value + ans[2].value;                
            lose += 1;
        }
        gameReady = false;
    }

    // function: is Letter
    function isLetter(string) {
        for (let i=0; i<string.length; i++) {
            if (string[i] < "A" || string[i] > "Z") return false;
        }        
        return true;
    }

    // function: isAlphber increasing
    function isAlphaIncr(string) {
        for (let i=1; i<string.length; i++) {
            if (string[i] <= string[i-1]) return false;
        }        
        return true;
    }

    // function: display user naming rule in screen
    function nameRuleOn() {
        document.getElementById("description").innerHTML = "Letters must be 4~8 chaacters, start with an uppercase and be alphabetically bigger than the letter before.";
    }

    // function: remove user naming rule in screen
    function nameRuleOff() {
        document.getElementById("description").innerHTML = "";
    }
})