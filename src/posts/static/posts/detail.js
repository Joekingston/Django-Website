const backBtn = document.getElementById("back-btn")

// url
const url = window.location.href + "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"

const spinnerBox = document.getElementById('spinner-box')
const updateBtn = document.getElementById("update-btn")
const deleteBtn = document.getElementById("delete-btn")
const postsBox = document.getElementById('posts-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertBox = document.getElementById('alert-box')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

// forms
const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')




// backBtn.addEventListener('click', ()=>{
//     history.back()
// })

$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        const data = response.data
        if(data.logged_in !== data.author){
            console.log('different')
        } else {
            console.log('the same')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }

        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        bodyEl.setAttribute('id', 'body')

        titleEl.textContent = data.title
        bodyEl.textContent = data.body

        postsBox.appendChild(titleEl)
        postsBox.appendChild(bodyEl)

        titleInput.value = data.title
        bodyInput.value = data.body

        spinnerBox.classList.add('not-visible')

    },
    error: function(error){
        console.log('error', error)
    },
})

updateForm.addEventListener('submit', e=>{
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')
    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'body': bodyInput.value,
        },    
        success: function(response){
            console.log(response)
            handleAlerts('success', 'Post has been updated!')
            title.textContent = response.title
            body.textContent = response.body
            $('#updateModal').modal('hide')
        },
        error: function(error){
            console.log('error', error)
        },
    })


})

deleteForm.addEventListener('submit', e=>{
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')
    $.ajax({
        type:'POST',
        url: deleteUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,

        },
        success: function(response){
            window.location.href = window.location.origin
            localStorage.setItem('title', titleInput.value)
            $('#updateModal').modal('hide')
        },
        error: function(error){
            console.log('error', error)
        },
    })
})