const {test, expect} = require("@playwright/test")
const pageURL = "http://localhost:3000/"

test('Verify "All books" link is visible.', async ({page}) => {
        await page.goto(pageURL);
        await page.waitForSelector('nav.navbar');
        const allBooksLink = await page.$('a[href="/catalog"]');
        const isLinkVisible = await allBooksLink.isVisible();
        expect(isLinkVisible).toBe(true);
    }
);

test('Verify "Login" button is visible.', async ({page}) => {
        await page.goto(pageURL);
        await page.waitForSelector('nav.navbar');
        const loginButton = await page.$('a[href="/login"]');
        const isLoginButtonVisible = await loginButton.isVisible();
        expect(isLoginButtonVisible).toBe(true);
    }
);

test('Verify "Register" button is visible.', async ({page}) => {
        await page.goto(pageURL);
        await page.waitForSelector('#site-header > nav');
        const registerButton = await page.$('a[href="/register"]');
        const isRegisterButtonVisible = await registerButton.isVisible();
        expect(isRegisterButtonVisible).toBe(true);
    }
);

test('Verify "All Books" link is visible after user login.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');

        const allBooksLink = await page.$('a[href="/catalog"]');
        const isAllBooksLinkVisible = await allBooksLink.isVisible();
        expect(isAllBooksLinkVisible).toBe(true);
    }
);

test('Verify "My Books" link is visible after user login.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');

        const myBooksLink = await page.$('a[href="/create"]');
        const isMyBooksLinkVisible = await myBooksLink.isVisible();
        expect(isMyBooksLinkVisible).toBe(true);
    }
);

test('Verify "Add Book" link is visible after user login.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');


        const addBooksLink = await page.$('a[href="/profile"]');
        const isAddBooksLinkVisible = await addBooksLink.isVisible();
        expect(isAddBooksLinkVisible).toBe(true);
    }
);

test('Verify "User Email"  is visible after user login.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');

        const userEmail = await page.$eval('div[id="user"] span', (span) => span.textContent);
        const expectedEmail = 'peter@abv.bg'
        expect(userEmail.split(' ')[1]).toBe(expectedEmail);
    }
);


test('Login with valid credentials.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');

        await page.$('a[href="/catalog"]');
        expect(page.url()).toBe(pageURL + 'catalog');
    }
);

test('Login with empty input fields.', async ({page}) => {
        await page.goto(pageURL + 'login');


        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(pageURL + 'login');
    }
);
test('Login with empty email field.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="password"]', '123456');


        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(pageURL + 'login');
    }
);

test('Login with empty password field.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(pageURL + 'login');
    }
);

test('Register with valid credentials.', async ({page}) => {
        await page.goto(pageURL + 'register');
        await page.fill('input[name="email"]', 'test125@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.fill('input[name="confirm-pass"]', '123456');
        await page.click('input[type="submit"]');

        await page.$('a[href="/catalog"]');
        expect(page.url()).toBe(pageURL + 'catalog');
    }
);

test('Try to register with empty input fields.', async ({page}) => {
        await page.goto(pageURL + 'register');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(pageURL + 'register');
    }
);

test('Try to register with empty email field.', async ({page}) => {
        await page.goto(pageURL + 'register');
        await page.fill('input[name="password"]', '123456');
        await page.fill('input[name="confirm-pass"]', '123456');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(pageURL + 'register');
    }
);

test('Try to register with empty password field.', async ({page}) => {
        await page.goto(pageURL + 'register');
        await page.fill('input[name="email"]', 'peter1@abv.bg');
        await page.fill('input[name="confirm-pass"]', '123456');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(pageURL + 'register');
    }
);

test('Try to register with empty confirm password field.', async ({page}) => {
        await page.goto(pageURL + 'register');
        await page.fill('input[name="email"]', 'peter1@abv.bg');
        await page.fill('input[name="password"]', '123456');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(pageURL + 'register');
    }
);

test('Try to register with different password fields.', async ({page}) => {
        await page.goto(pageURL + 'register');
        await page.fill('input[name="email"]', 'test125@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.fill('input[name="confirm-pass"]', '123457');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('Passwords don\'t match!');
            await dialog.accept();
        });
        await page.click('input[type="submit"]');

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(pageURL + 'register');
    }
);

test('Add book with correct data', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog')
        ]);
        await page.click('a[href="/create"]');
        await page.waitForSelector('#create-form')
        await page.fill('#title', 'Test Book');
        await page.fill('#description', 'This is a test book description');
        await page.fill('#image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/1200px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg')
        await page.selectOption('#type', 'Fiction');
        await page.click('#create-form input[type="submit"]');
        await page.waitForURL(pageURL + 'catalog')
        expect(page.url()).toBe(pageURL + 'catalog');
    }
);

test('Add book with empty title field', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);
        await page.click('a[href="/create"]');
        await page.waitForSelector('#create-form')
        await page.fill('#description', 'This is a test book description');
        await page.fill(
            '#image',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg' +
            '_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/' +
            '1200px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg')
        await page.selectOption('#type', 'Fiction');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('#create-form input[type="submit"]');

        await page.$('a[href="/create"]')
        expect(page.url()).toBe(pageURL + 'create');
    }
);

test('Add book with empty description field', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);
        await page.click('a[href="/create"]');
        await page.waitForSelector('#create-form')
        await page.fill('#title', 'This is a test Title');
        await page.fill('#image', 'https://upload.wikimedia.org/' +
            'wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%' +
            '2C_New_York_Public_Library%2C_2009._Pic_01.jpg/1200px-Gutenberg' +
            '_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg')
        await page.selectOption('#type', 'Fiction');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('#create-form input[type="submit"]');

        await page.$('a[href="/create"]')
        expect(page.url()).toBe(pageURL + 'create');
    }
);

test('Add book with empty image field', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);
        await page.click('a[href="/create"]');
        await page.waitForSelector('#create-form')
        await page.fill('#title', 'This is a test Title');
        await page.fill('#description', 'This is a test book description');
        await page.selectOption('#type', 'Fiction');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required!');
            await dialog.accept();
        });
        await page.click('#create-form input[type="submit"]');

        await page.$('a[href="/create"]')
        expect(page.url()).toBe(pageURL + 'create');
    }
);

test('Login and verify all books are displayed.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);
        await page.waitForSelector('.dashboard');

        const bookElements = await page.$$('.other-books-list li');
        expect(bookElements.length).toBeGreaterThan(0);

    }
);

test('Login and verify if no books are displayed.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);
        await page.waitForSelector('.dashboard');

        const noBooksMessage = await page.textContent('.no-books');
        expect(noBooksMessage).toBe('No books in database!');

    }
);
test('Guest user can see details of book.', async ({page}) => {
        await page.goto(pageURL + 'catalog');

        await Promise.all([
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information');

        const detailsPageTitle = await page.textContent('.book-information h3');
        expect(detailsPageTitle).toBe('Test Book');

    }
);
test('Login and navigate to Details page check Title is correct.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information');

        const detailsPageTitle = await page.textContent('.book-information h3');
        expect(detailsPageTitle).toBe('Test Book');

    }
);


test('Book type is correct.', async ({page}) => {
        await page.goto(pageURL + 'catalog');

        await Promise.all([
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information');

        const detailsPageTitle = await page.textContent('.book-information p');
        expect(detailsPageTitle).toBe('Type: Fiction');

    }
);

test('Book description is correct.', async ({page}) => {
        await page.goto(pageURL + 'catalog');

        await Promise.all([
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information');

        const detailsPageTitle = await page.textContent('.book-description p');
        expect(detailsPageTitle).toBe('This is a test book description');
    }
);

test('Book Edit Button is visible for creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        const buttonSelector = '.book-information div a.button[href^="/edit/"]'
        await page.waitForSelector(buttonSelector);

        const editButton = await page.$(buttonSelector);
        const isEditButtonVisible = await editButton.isVisible();
        expect(isEditButtonVisible).toBe(true);
    }
);

test('Book Delete Button is visible for creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        const buttonSelector = '.actions a.button:has-text("Delete")'
        await page.waitForSelector(buttonSelector);

        const deleteButton = await page.$(buttonSelector);
        const isDeleteButtonVisible = await deleteButton.isVisible();
        expect(isDeleteButtonVisible).toBe(true);
    }
);

test('Book Edit Button is NOT visible for non-creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'john@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        const buttonSelector = '.book-information div'
        await page.waitForSelector(buttonSelector);

        const editButton = await page.$(buttonSelector + ' a.button[href^="/edit/"]');
        const isEditButtonVisible = await editButton === null;
        expect(isEditButtonVisible).toBe(true);
    }
);

test('Book Delete Button is Not visible for non-creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'john@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        const buttonSelector = '.book-information div'
        await page.waitForSelector(buttonSelector);

        const deleteButton = await page.$('a.button:has-text("Delete")');
        const isDeleteButtonVisible = await deleteButton === null;
        expect(isDeleteButtonVisible).toBe(true);
    }
);

test('Book Like Button is NOT visible for creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information div div');

        const likeButton = await page.$('a.button:has-text("Like")');
        const isLikeButtonVisible = await likeButton == null;
        expect(isLikeButtonVisible).toBe(true);
    }
);

test('Book Like Button is visible for NON-creator.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'john@abv.bg');
        await page.fill('input[name="password"]', '123456');

        await Promise.all([
            page.click('input[type="submit"]'),
            page.waitForURL(pageURL + 'catalog'),
        ]);

        await page.click('a[href="/catalog"]');
        await page.waitForSelector('.otherBooks');
        await page.click('.otherBooks a.button');
        await page.waitForSelector('.book-information div div');

        const likeButton = await page.$('a.button:has-text("Like")');
        const isLikeButtonVisible = await likeButton.isVisible();
        expect(isLikeButtonVisible).toBe(true);
    }
);

test('Verify redirection of logout link after user login.', async ({page}) => {
        await page.goto(pageURL + 'login');
        await page.fill('input[name="email"]', 'john@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[type="submit"]');

        const logoutLink = await page.$('a[href="javascript:void(0)"]');
        await logoutLink.click();

        const redirectURL = page.url();
        expect(redirectURL).toBe(pageURL + 'catalog')
    }
);

