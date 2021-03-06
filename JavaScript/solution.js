function attachEvents() {

    const url = `https://messanger-b24ae.firebaseio.com/messages.json`;
    let firstMessage = 0;
    let firstMessageKey = ``;
    let historyClicked = false;
    let username = ``;
    let counter = 1;

    $('#author').on('click', () => {
        $('#author').attr('placeholder', '');
        $('#error').hide();
    });

    $('#content').on('click', () => {
        $('#content').attr('placeholder', '');
        $('#error').hide();
    });

    $('#submit').on('click', sendMsg => {
        let author = $('#author').val();
        let content = $('#content').val();
        let timeStamp = Date.now();
        let message;

        if (author === '' && firstMessage === 0) {
            $('#error').text('Please enter your name!');
            $('#error').show();
            return;
        } else if (content.includes('<script>') || content.includes('</script>')) {
            $('#error').text('For Security purposes <script> is forbidden!');
            $('#error').show();
            return;
        } else {
            firstMessage++;
        }

        if (author !== '') {
            username = author;
            message = {
                author: author,
                content: content,
                timeStamp: timeStamp
            };
        } else {
            message = {
                author: username,
                content: content,
                timeStamp: timeStamp
            }
        }

        $('#author').attr('placeholder', `Your name "${username}" is now autofill`);
        $('#content').attr('placeholder', 'Enter next message');

        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(message),
            success: (id) => {
                $('#author').val('');
                $('#content').val('');

                if (firstMessage === 1) {
                    firstMessageKey = id.name;
                }

                $.ajax({
                    method: 'GET',
                    url: url,
                    success: (data) => {
                        let flag = false;
                        let profileName = '';
                        let newMessage = '';
                        let div = ``;

                        for (let [key, message] of Object.entries(data)) {

                            if (key === firstMessageKey) {
                                flag = true;
                            }
                            if (flag && !historyClicked) {

                                profileName = `${message.author}\n`;
                                newMessage = `${message.content}\n`;

                                div = $(`<div id="chat-messages"><div class="profile my-profile"><img id="myImg" src="../Images/SasukeImg.jpg" width="30" height="30"/><span>${profileName}</span></div><div class="message my-message">${newMessage}</div></div>`);

                            } else if (historyClicked) {
                                $('#refresh').click();
                            }
                        }

                        console.log(counter);
                        if (counter % 2 === 0) {

                            $('.chat-box-body').append(div);
                            $('#myImg').attr('src', '../Images/ItachiImg.jpg');
                            counter++;
                        } else if (counter % 2 === 1) {
                            $('.chat-box-body').append(div);
                            $('#myImg').attr('src', '../Images/ItachiImg.jpg');

                            console.log(`vtori if`);
                            counter++;
                        }

                    }
                })
            }
        })
    });

    $('#refresh').on('click', showMsg => {
        historyClicked = true;

        $.ajax({
            method: 'GET',
            url: url,
            success: (data) => {
                let profileName = '';
                let newMessage = '';
                let div = ``;

                if (data !== null) {
                    for (let message of Object.values(data)) {
                        profileName = `${message.author}\n`;
                        newMessage = `${message.content}\n`;

                        div = $(`<div id="chat-messages"><div class="profile my-profile"><img src="../Images/SasukeImg.jpg" width="30" height="30"/><span>${profileName}</span></div><div class="message my-message">${newMessage}</div></div>`);

                        $('.chat-box-body').append(div);
                    }
                } else {
                    $('#error').text('No History!');
                    $('#error').show();
                }

            }
        })
    })

    $('#delete').on('click', delHistory => {
        let clearHistory = false;
        delHistory.preventDefault();
        swal({
            title: "This will delete your chat history",
            text: "Once deleted, you will not be able to recover the messages, are you sure you want to do it?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDel) => {
            if (willDel) {
                swal('The history of all messages has been successfully deleted!', {
                    icon: 'success',
                });

                $.ajax({
                    method: 'DELETE',
                    url: url,
                    success: () => {
                        $('#error').text('There is no history!');
                        $('#error').show();
                        $('.profile.my-profile').hide();
                        $('.message.my-message').hide();
                    }
                });
            } else {
                swal('Your message history is safe!');
            }
        });
    });
}