import requests

def sendBotMessage(order):
    token = ''
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    message = f"""<b>Новый заказ</b>
    <b>Дата</b>: {order['date']}
    <b>Имя:</b> {order['name']}
    <b>Почта</b>: {order['email']}
    <b>Оплата</b>: {order['payment']}
    <b>Адрес</b>: {order['address']}
    <b>Телефон</b>: {order['phone']}
    <b>Товары</b>:
    {order['products']}
    <b>Комментарии</b>:
    <i>{order['commentary']}</i>
    <a href='https://allcut-admin.space/customer/{order['customer']}'>Посмотреть клиента</a>
    """
    anatoly = {'chat_id': {}, 'text': message, 'parse_mode': 'HTML'}
    oleg = {'chat_id': {}, 'text': message, 'parse_mode': 'HTML'}
    requests.post(url, anatoly).json()
    requests.post(url, oleg).json()
    
def sendQuestionMessage(message):
    token = ''
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    message = f"""<b>Сообщение с сайта</b>
    <b>Дата</b>: {message['date']}
    <b>Имя:</b> {message['name']}
    <b>Почта</b>: {message['email']}
    <b>Телефон</b>: {message['phone']}
    <b>Сообщение</b>:
    {message['message']}
    """
    anatoly = {'chat_id': {}, 'text': message, 'parse_mode': 'HTML'}
    oleg = {'chat_id': {}, 'text': message, 'parse_mode': 'HTML'}
    requests.post(url, anatoly).json()
    requests.post(url, oleg).json()
    