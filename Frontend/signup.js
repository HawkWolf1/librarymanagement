async function signUp(event){
    event.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const phone = document.getElementById('phone').value
    const role = document.getElementById('role').value

    const myObject = {
        name,
        email,
        password,
        phone,
        role
    }
    console.log(myObject)
    try{
        const abc = await axios.post("http://localhost:5500/user/add-user", myObject) 
        console.log('aaaaaa')
        if (abc.status === 201){
            window.location.href = "./login.html"
        } else {
            throw new Error('Unable to Sign you Up')
        }
    }
       
    catch(err){
        document.body.innerHTML = document.body.innerHTML + "<h3 style='color:black'> Something went wrong!!! </h3>"
        console.log("Error Block: ",err)
    }                  
}