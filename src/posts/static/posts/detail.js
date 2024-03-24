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
const dropzone = document.getElementById('my-dropzone')
const addBtn = document.getElementById('add-btn')
const closeBtn = [...document.getElementsByClassName('add-modal-close')]




// backBtn.addEventListener('click', ()=>{
//     history.back()
// })
let newPostId = null
$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        const data = response.data
        newPostId = data.id
        if(data.logged_in !== data.author){
            console.log('different')
        } else {
            console.log('the same')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }
        console.log(newPostId)
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
closeBtn.forEach(btn=>btn.addEventListener('click', ()=>{
    postForm.reset()
    if (!dropzone.classList.contains('not-visible')){
        dropzone.classList.add('not-visible')   
    }
    if(addBtn.classList.contains('not-visible')){
        addBtn.classList.remove('not-visible')
    }
    const myDropzone = Dropzone.forElement("#my-dropzone")
    myDropzone.removeAllFiles(true)
    
}))

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

Dropzone.autoDiscover = false
const myDropzone = new Dropzone('#my-dropzone', {
    url: '/upload/',
    init: function() {
        this.on('sending', function(file, xhr, formData){
            formData.append('csrfmiddlewaretoken', csrf[0].value)
            formData.append('new_post_id', newPostId)
        })
    },
    maxFiles: 3,
    maxFilesize: 4,
    acceptedFiles: '.png, .jpg, jpeg'
})

addBtn.addEventListener('click', ()=>{
    const myDropzone = Dropzone.forElement("#my-dropzone")
    myDropzone.removeAllFiles(true)
    location.reload();
})