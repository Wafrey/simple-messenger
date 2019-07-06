function attachEvents() {

    const url = `https://messanger-b24ae.firebaseio.com/messages.json`;
    let firstMessage = 0;
    let firstMessageKey = ``;
    let historyClicked = false;
    let username = ``;

    $('#author').on('click', () => {
        $('#author').attr('placeholder', '');
    });

    $('#content').on('click', () => {
        $('#content').attr('placeholder', '');
    });

    $('#submit').on('click', sendMsg => {
        let author = $('#author').val();
        let content = $('#content').val();
        let timeStamp = Date.now();
        let message;

        if (author === '' && firstMessage === 0) {
            $('#error').text('Please enter your name!');
            return;
        } else if (content.includes('<script>') || content.includes('</script>')) {
            $('#error').text('For Security purposes <script> is forbidden!');
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
            }
        })
    });
}