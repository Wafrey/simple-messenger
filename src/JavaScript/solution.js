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

    $('#submit').on('click', send => {
        let author = $('#author').val();
        let content = $('#content').val();
        let timeStamp = Date.now();
        let message;

        if (author === '' && firstMessage === 0) {
            $('#error').text('Please enter your name!');
            return;
        }
    });
}