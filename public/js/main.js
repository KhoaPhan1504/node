function loadPage(page) {
    $.ajax({
        url: '/user?page=' + page,
        type: 'GET'
    })
    .then(data => {
        $('#content').html('');

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
    
            var item = $(`
    
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('ERROR')
    })
}