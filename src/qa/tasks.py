from invoke import task
from cache.cache import flushdb as flush_cache
from qa.helpers import generate_test_data, clear_test_data

@task
def clear_data(ctx):
    clear_test_data()

@task(help={
    'account_number': 'Number of generated account'
})
def generate_data(ctx, account_number=10, chat_numbers=3):
    """
    Fill data in DataBase
    """
    print('Start filling...')

    generate_test_data(account_number, chat_numbers)
    flush_cache()

    print('Success')
