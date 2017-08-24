[![Build Status](https://travis-ci.org/BaReinhard/typed-react-component.png?branch=master)](https://travis-ci.org/BaReinhard/typed-react-component)

# Typed-React-Component
A simple react component based loosely off of Typed.js

# Install 

```
npm install -save typed-react-component@latest
```

# Example Usage

```
import React from 'React';
import TypedJS from 'typed-react-component';
import './fonts.css';
let props = {
        style: { fontSize: '50px', fontFamily:'Dancing Script, cursive' },
        typings: ['Hello there my friend', 'Another Test portion', 'Last one here'],
        loop: false,
        typeSpeed: 15,
        delay: 1200,
        startDelay: 1200,
    };
export default const UsingTypeComponent = () =>{

    return (
        <div>
                Loop False<br />
                <TypedJS {...props} />
                <br />
                Loop True<br />
                <TypedJS {...Object.assign({}, props, { loop: true })} />

        </div>
    );
}
```

# Example Output
![TypedJS](https://lh3.googleusercontent.com/dijYpvf-Er67D-8cH-KuB1OKyvVPA5ZOiPC4mZn19yxNkS4-o6hJ5MSP6nMAs5yVW6t5tJy5J52On803PSieKV2EEsu3RESqO4sc1UI_xaJpl4Ppqn72BXRMdJt7prgB1EYXwO-pWHnoZhRnwop-W-dUZJuSXiGiKr9QxEezdQBcZlOB8K_3etKjyhfMNrVDtMSiSJG4hS1W1vf-3V_ExYzs9p4E3RkH9NvJc0x3JGOuB6d0aOrGl1_d24XP_pogJeGwRqzUDw0Zp0Q-kCB9Khuq4tv8s_W6_UKlPKMuGKRsffP_3jn1pj3gAvn67U9YaPt6-jPlNGYwDvglXdV-lGCpPIjTEeGFTWQbBZPaBfdaLnO3OaPE72JWA6HqTPPKl_-MTMejLwrcv01-faDkxRxS9ukP9VpYTMF_GxSKHqwvFd77CvQ9lSQu__tzRlauMryF0EKfv1OlSgrDLDphAOSXgI66T21ZtgqBC6EARzbokaKtVurQeFPO1rr1SdqRwkE97_43y204t7qCWgMLCjlPWge7yDAV2jRaqXVtJRuu_e-vjcyEyb5-iFrlBN-dAER4MrFkCMfUL6Zl91qDMOzJx_4A3LYSylXhxONe69lOaC-U7v6O=w600-h375-no)

# API

## style (Object)
* style is an object containing..., you guessed it! styles. It will be applied to the outter span element of TypedJS, inside this element there is another span wrapped around the blinkerCharacter, which has a corresponding blinkerStyle which is applied to this element.

## blinkerStyle (Object)
* blinkerStyle is the same thing as style, but only applies to the blinkerCharacter, be weary when using `opacity` in this Object as it is what is used to transition the blinking of the character. This Object also gives you the ability to remove the blinking of this element, by simply using the following you can completely get rid of the blink of the element.
```
blinkerStyle={
    opacity: 1,
}
```
## typings (array)
* Typings is an array of string values, essentially words or phrases that you want to be typed out.

## loop (boolean)
* loop is a boolean value that is used to determine whether or not you want all the typings in your continue typing indefinitely, or stop after the first loops. When set to true, it will continuously cycle through. When set to false, it will stop on the last typing and display it in its entirety.

## typeSpeed (integer)
* typeSpeed is technically a delay before the next character is typed out. The lower the typeSpeed the faster the words will be typed, the higher to slower the words will be typed.

## backTypeSpeed (integer)
* backTypeSpeed is the same things as typeSpeed but gives you the ability to have the removal of each character at a faster rate, by default it is twice as fast as the current delay.

## delay (integer or array)
* delay is either an integer which will be used as the delay for after each typing is typed. If delay is an array of 1 integer that integer will also be used for all the delay values. However, you can pass an array of delay values, if this array is shorter than the typings array, it will be filled with a default value of 1000ms. If the array is larger than the typings array the values will be spliced to match the typings array size.

## startDelay (integer)
* This startDelay is an integer which is used for the amount of time before TypedJS first begins typing values. (Not to be confused with the time before each new typing).

## blinkerCharacter (string)
* This is a character or string such as '|', '©', 'ç', 'C', 'harrypotter', etc..., which will be used as a blinking character, which is typically seen in CLI's when typing. By default is it the pipe character (|).

## blinkerDelay (integer) 
* This is the delay at which the blinkerCharacter will blink, the lower blinkerDelay is the quicker the blinking will appear, the larger the amount the slower the blinker will blink. The default for this value is 200 if none is provided.

## onComplete (function)
* onComplete is a callback function which is executed only when loop is set to false, and will execute once all the typings have been typed out.