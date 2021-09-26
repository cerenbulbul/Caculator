# Calculator


### Creator: 

- Ceren Bülbül

___



1. [ Introduction ](#Intro)
2. [ Project Overwiev ](#Def)
   * [Front-end Part](#Front) 
       - [Functions](#Func)
       - [Design](#Design)
   * [Back-end Part](#Back)
3. [ Project Tools](#Tools) 
5. [ How It Runs ? ](#Run)  
6. [How It Works ?](#Work)
7. [ Demo ](#Demo) 


<a name="Intro"></a>
## Introduction

This project's intention is a create a bot calculator application. Requirements for this projects are: 

* Operation command: The purpose of this command is to calculate the desired operations.
* History Command: The purpose of this command is to display the 10 most recently calculated transactions.


<a name="Def"></a>
## Project Overwiev

In this project, I first created the functions and design of the calculator with the react framework and saved them in the 'client' folder. Then, I created a database with MongoDB and ensured that the calculated operations were saved in this database with the help of socket.io. Finally, I had the 10 most recent data displayed from the saved data.

<a name="Front"></a>
### Front-end Part

I have examined the frontend part in two different ways, the design of the calculator and the functions of its operations.

<a name="Func"></a>
### Functions

I created the updateCalculate() function to save the operations. There are two conditions while implementing the function. One of them is, if before the operation is nothing or include another operation return nothing. Otherwise, calculate the operation using eval() function. 

```
  const updateCalculate = value => {
    if (ops.includes(value) && getCalc === '' ||
      ops.includes(value) && ops.includes(getCalc.slice(-1))) {
      return;
    }
    if (!ops.includes(value)) {
      setResult(eval(getCalc + value).toString());
    }
  }
```

I created the showCalculate() function to show calculation and save the calculation to database. To save the calculation I used emit() function. 

```
  const showCalculate = () => {
    setCalc(eval(getCalc).toString())
    socket.emit('history', eval(getCalc).toString())
    window.location.reload();
  }
```

<a name="Design"></a>
### Design

<p align="center">
 <img src="https://user-images.githubusercontent.com/36292743/134823577-6f93af33-d44a-416c-a0e2-e16606a0a75c.png" width="500" height="300"> 
</p>

<a name="Back"></a>
### Back-end Part

I created a database using MangoDB. The database has one table and 2 attributes these are id and calculator. 

<img src="https://user-images.githubusercontent.com/36292743/134823730-b65d3b43-0ee4-4873-ac8b-7a742f0ab511.png" width="200" height="200"> 
 

I used socket library to save the calculator result data to MangoDB. To save the data I used emit() method.

```
  socket.on('history', calculator => {
        const calculation = new calculateModel({ calculator });
        calculation.save().then(() => {
            io.emit('history', calculator)
        })
  })
```

<a name="Tools"></a>
## Project Tools

**Tools:**
- React.js Framework
- MangoDB
- Socket.io

**Libraries:**
- mangoose
- express
- cors
- socket.io

<a name="Run"></a>
## How It Runs ?

```
  npm install
  cd server 
  npm start
  cd client 
  npm start
```

<a name="Works"></a>
## How It Works ?

I explain the work in an example. For example, in the calculator you would like to multiply 7 and 4 (7*4). As you see the bellow the screen. 

<p align="center">
 <img src="https://user-images.githubusercontent.com/36292743/134824522-bbb50516-356d-44d4-9654-310c68db4c72.png" width="500" height="300"> 
</p>

After that, you are clicking "=" button. Then, the "History" card is going to change as you see the bellow. 

<p align="center">
 <img src="https://user-images.githubusercontent.com/36292743/134824557-b591aed7-f7b1-4943-b676-f8b7519fc9bc.png" width="200" height="300"> 
</p>

<a name="Demo"></a>
## Demo

[![IMAGE ALT TEXT](http://img.youtube.com/vi/GsF8Dt2YFko/0.jpg)](http://www.youtube.com/watch?v=GsF8Dt2YFko "Click For Demo")


