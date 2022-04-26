$(function() {
    // // 初始化右侧滚动条
    // // 这个方法定义在scroll.js中
    resetui()

    //为发送按钮绑定点击事件
    $('#btnSeen').on('click', function() {
            //接收用户在输入框输入的内容  trim 是指去除内容前后的空格
            let text = $('#ipt').val().trim()
                //如果输入为空的话，则返回输入框内容为空
            if (text.length <= 0) {
                return $('#ipt').val("")
            }
            //如果用户输入了聊天内容，则将聊天内容追加到页面上显示
            $('#talk_list').append(`<li class="right_word">
        <img src="img/person02.png" /> <span>${text}</span>
    </li>`)
                //用户发送后输入框内容显示空
            $('#ipt').val("")
                // 重置滚动条的位置
            resetui()
                //发起请求，获取内容
            getMag(text)
        })
        //获取聊天机器人发送回来的消息
        //封装一个函数，当用户输入内容时，则内容为实参，把实参内容输送到函数的形参中，然后根据内容回复相应的消息
    function getMag(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            //res 是接收服务器返回回来的内容 //服务器相应回来的数据
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    let msg = res.data.info.text
                    $('#talk_list').append(`<li class="left_word">
                    <img src="img/person01.png" /> <span>${msg}</span>
                </li>`)
                        // 重置滚动条的位置
                    resetui()
                }


            }
        })
    }
})