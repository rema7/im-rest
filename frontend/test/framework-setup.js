import nock from 'nock'

const app = document.createElement('div')
app.setAttribute('id', 'app')
document.body.appendChild(app)

afterEach(() => {
    const pendingMocksCount = nock.pendingMocks().length
    nock.cleanAll()
    if (pendingMocksCount) {
        /* eslint-disable no-console */
        console.error('left pending nock mocks after test')
    }
    expect(pendingMocksCount).toEqual(0)
})

