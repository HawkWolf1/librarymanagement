async function login(event){
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

        const loginD = {
            email,
            password
        }
        console.log(loginD)
        try{
            const response = await axios.post("http://localhost:5500/user/login", loginD) 
            console.log(response)
            console.log(response.data)
           
            if (response.status === 200){   
                    const role = response.data.role  
                    localStorage.setItem('token', response.data.token)   
                    alert('login successful')    
                    if(role==='User'){
                        window.location.href = "./userPage.html"; 
                      
                    }else{
                        window.location.href = "./adminPage.html"; 
                    }         
            } else {
                throw new Error('Unable to log you in!')
            }
            
        }
                   
        catch(err){
            console.log(JSON.stringify(err))
            document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> We have an Error!!! </h3>"
            
        }                  
            }