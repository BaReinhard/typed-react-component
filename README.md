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
![TypedJS](https://github.com/BaReinhard/gitmatch.me-angular4/blob/master/typed.js.gif?raw=true)