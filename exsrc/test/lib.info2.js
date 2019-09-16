function test() {
    setTimeout(_ => {
        console.log(4)
    });
    new Promise(resolve => {
        resolve();
        console.log(1);
        setTimeout(_ => {
            console.log(5)
        });
    }).then(_ => {
        console.log(3);
    });
    console.log(2);
}

function test2() {
    document.body.addEventListener('click', _ => console.log('click'))

    // document.body.click()
    document.body.dispatchEvent(new Event('click'))
    console.log('done')
}

function test3() {
    setTimeout(_ => console.log(4))

    async function main() {
        console.log(1)
        await Promise.resolve()
        console.log(3)
    }

    main()

    console.log(2)
}

function test4() {
    console.log('1');

    setTimeout(function () {
        console.log('2');
        setTimeout(function () {
            console.log('3');
        })
        new Promise(function (resolve) {
            console.log('4');
            resolve();
        }).then(function () {
            console.log('5')
        })
    })
    setTimeout(function () {
        console.log('6');
    })
    new Promise(function (resolve) {
        console.log('7');
        resolve();
    }).then(function () {
        console.log('8')
    })

    setTimeout(function () {
        console.log('9');
        setTimeout(function () {
            console.log('10');
        })
        new Promise(function (resolve) {
            console.log('11');
            resolve();
        }).then(function () {
            console.log('12')
        })
    })

}