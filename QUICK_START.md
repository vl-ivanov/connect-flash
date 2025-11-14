# Quick Start Guide - connect-flash v0.2.0

## Prerequisites

- **Node.js 18.0.0 or higher** (LTS recommended)
- Express 4.x or higher
- express-session middleware

## Installation

```bash
npm install connect-flash express-session
```

## Basic Setup

```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// 1. Configure session middleware (REQUIRED)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// 2. Add flash middleware
app.use(flash());

// Now req.flash() is available in all routes!
```

## Usage Examples

### Setting Flash Messages

```javascript
app.post('/login', (req, res) => {
  // Authenticate user...
  
  if (loginSuccess) {
    req.flash('success', 'Welcome back!');
    res.redirect('/dashboard');
  } else {
    req.flash('error', 'Invalid credentials');
    res.redirect('/login');
  }
});
```

### Reading Flash Messages

```javascript
app.get('/dashboard', (req, res) => {
  // Get messages (automatically clears them)
  const successMessages = req.flash('success');
  const errorMessages = req.flash('error');
  
  res.render('dashboard', {
    success: successMessages,
    errors: errorMessages
  });
});
```

### Get All Messages at Once

```javascript
app.get('/page', (req, res) => {
  // Get all flash messages
  const messages = req.flash();
  
  // messages = {
  //   success: ['Message 1', 'Message 2'],
  //   error: ['Error message'],
  //   info: ['Info message']
  // }
  
  res.render('page', { messages });
});
```

### Message Formatting

```javascript
// Simple message
req.flash('info', 'Action completed');

// With formatting (uses util.format)
req.flash('info', 'Hello %s!', username);
req.flash('info', 'You have %d messages', count);

// Multiple messages at once
req.flash('warning', ['Error 1', 'Error 2', 'Error 3']);
```

## Template Integration

### EJS Example

```ejs
<% if (messages.success && messages.success.length > 0) { %>
  <div class="alert alert-success">
    <% messages.success.forEach(msg => { %>
      <p><%= msg %></p>
    <% }); %>
  </div>
<% } %>

<% if (messages.error && messages.error.length > 0) { %>
  <div class="alert alert-danger">
    <% messages.error.forEach(msg => { %>
      <p><%= msg %></p>
    <% }); %>
  </div>
<% } %>
```

### Pug/Jade Example

```pug
if messages.success && messages.success.length
  .alert.alert-success
    each msg in messages.success
      p= msg

if messages.error && messages.error.length
  .alert.alert-danger
    each msg in messages.error
      p= msg
```

### Handlebars Example

```handlebars
{{#if messages.success}}
  <div class="alert alert-success">
    {{#each messages.success}}
      <p>{{this}}</p>
    {{/each}}
  </div>
{{/if}}

{{#if messages.error}}
  <div class="alert alert-danger">
    {{#each messages.error}}
      <p>{{this}}</p>
    {{/each}}
  </div>
{{/if}}
```

## Middleware Integration

### Make Messages Available to All Views

```javascript
// Add middleware to make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Now all your views have access to `messages` automatically
```

### Custom Helper Function

```javascript
// Create a helper to format messages
app.use((req, res, next) => {
  res.locals.getMessages = () => {
    const messages = req.flash();
    const formatted = [];
    
    for (const [type, msgs] of Object.entries(messages)) {
      msgs.forEach(msg => {
        formatted.push({ type, message: msg });
      });
    }
    
    return formatted;
  };
  
  next();
});
```

## Complete Example App

```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard-cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Flash Demo</h1>
    <a href="/set-message">Set a flash message</a>
  `);
});

app.get('/set-message', (req, res) => {
  req.flash('info', 'This is a flash message!');
  req.flash('success', 'Action completed successfully');
  res.redirect('/show-messages');
});

app.get('/show-messages', (req, res) => {
  const messages = req.flash();
  res.json(messages);
});

// Form example
app.get('/form', (req, res) => {
  const errors = req.flash('error');
  res.send(`
    <h1>Contact Form</h1>
    ${errors.length ? `<div style="color:red">${errors.join('<br>')}</div>` : ''}
    <form method="POST" action="/submit">
      <input name="email" placeholder="Email" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    req.flash('error', 'Please enter a valid email address');
    res.redirect('/form');
  } else {
    req.flash('success', `Thank you! Email ${email} received.`);
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Common Patterns

### Success/Error Pattern

```javascript
app.post('/action', async (req, res) => {
  try {
    await performAction();
    req.flash('success', 'Action completed successfully');
    res.redirect('/success-page');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/error-page');
  }
});
```

### Form Validation Pattern

```javascript
app.post('/register', (req, res) => {
  const errors = validateForm(req.body);
  
  if (errors.length > 0) {
    // Store all errors as flash messages
    errors.forEach(err => req.flash('error', err));
    res.redirect('/register');
  } else {
    req.flash('success', 'Registration successful!');
    res.redirect('/dashboard');
  }
});
```

### Multi-Step Form Pattern

```javascript
app.post('/step-1', (req, res) => {
  // Save step 1 data to session
  req.session.step1Data = req.body;
  req.flash('info', 'Step 1 completed. Continue to step 2.');
  res.redirect('/step-2');
});

app.post('/step-2', (req, res) => {
  // Validate all steps
  if (!req.session.step1Data) {
    req.flash('error', 'Please complete step 1 first');
    res.redirect('/step-1');
  } else {
    req.flash('success', 'All steps completed!');
    res.redirect('/confirmation');
  }
});
```

## Troubleshooting

### "req.flash() requires sessions"

**Problem:** Session middleware not configured.

**Solution:**
```javascript
// Make sure session middleware comes BEFORE flash
app.use(session({ /* config */ }));  // ✅ First
app.use(flash());                     // ✅ Second
```

### Messages Not Persisting

**Problem:** Session configuration issue.

**Solution:**
```javascript
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,  // Set to true
  cookie: { 
    maxAge: 60000,
    secure: false  // Set true only with HTTPS
  }
}));
```

### Messages Appearing Multiple Times

**Problem:** Calling `req.flash()` without a type doesn't clear specific messages.

**Solution:**
```javascript
// Wrong - doesn't clear messages
const msgs = req.flash();

// Correct - clears specific type
const successMsgs = req.flash('success');
const errorMsgs = req.flash('error');
```

## API Reference

### `req.flash(type, message)`

Set a flash message.

**Parameters:**
- `type` (String): Message category (e.g., 'error', 'success', 'info')
- `message` (String|Array): Message or array of messages

**Returns:** Number of messages for that type

**Example:**
```javascript
req.flash('info', 'Hello');           // Returns: 1
req.flash('info', 'World');           // Returns: 2
req.flash('info', ['A', 'B', 'C']);   // Returns: 3
```

### `req.flash(type)`

Get and clear messages of a specific type.

**Parameters:**
- `type` (String): Message category

**Returns:** Array of messages

**Example:**
```javascript
req.flash('error');  // ['Error 1', 'Error 2']
req.flash('error');  // [] (cleared after first call)
```

### `req.flash()`

Get and clear all messages.

**Returns:** Object with message types as keys

**Example:**
```javascript
req.flash();  
// { 
//   success: ['Success!'], 
//   error: ['Error!'],
//   info: ['Info!']
// }
```

## Best Practices

1. ✅ Always set up session middleware before flash
2. ✅ Use descriptive message types ('error', 'success', 'warning', 'info')
3. ✅ Flash messages before redirects, not renders
4. ✅ Clear messages after reading them (automatic)
5. ✅ Keep messages short and user-friendly
6. ✅ Use formatting for dynamic content
7. ✅ Store flash data in session, not cookies

## Next Steps

- 📖 Read [README.md](./README.md) for more details
- 📋 Check [NODE_VERSION_SUPPORT.md](./NODE_VERSION_SUPPORT.md) for version info
- 🔄 See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) if upgrading
- 💡 View [examples/](./examples/) for complete applications

## Need Help?

- 🐛 [Report issues](https://github.com/jaredhanson/connect-flash/issues)
- 💬 [Ask questions](https://github.com/jaredhanson/connect-flash/discussions)
- 📚 [Read documentation](https://github.com/jaredhanson/connect-flash)

---

**Version:** 0.2.0  
**Node.js:** ≥18.0.0  
**License:** MIT