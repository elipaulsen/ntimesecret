<script lang="ts">
    import { saveSecret, type SecretDocument } from '$lib/firestore';
    import { v4 } from 'uuid';
    import { copy } from '$lib/utils';

    let secret: string = '';
    let n: number = 1;
    let expiresAt: Date = new Date(86400000000000);
    let passcode: string = '';
    let secretLink: string = '';

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        console.log(expiresAt.getTime());
        const uuid: string = v4();
        const createdAt: Date = new Date();
        const expirationDate = new Date(expiresAt);
        const document: SecretDocument = {
            uuid,
            secret,
            n,
            createdAt: createdAt.getTime(),
            expiresAt: expiresAt.getTime(),
            passcode
        };

        saveSecret(document);
        secretLink = `https://ntimesecret.web.app/${uuid}`;
    };
</script>

<div class="container">
    <h1>ntimesecret</h1>
    <h3>Once your secret has been accessed N times, it’s gone—forever.</h3>

    <br />

    <form onsubmit={handleSubmit} class="form-fields">
        <!-- Message Input -->
        <div class="input-group">
            <label for="secret-text" class="input-label">Your Secret</label>
            <textarea
                id="secret-text"
                bind:value={secret}
                rows="4"
                class="input-field"
                placeholder="Enter your secret..."
                required
                disabled={!!secretLink}
            ></textarea>
        </div>

        <!-- Number of Times to be Accessed -->
        <div class="flex space-x-4">
            <!-- Number of Views -->
            <div class="input-group flex-1">
                <label for="max-views" class="input-label">How many times can this be viewed?</label
                >
                <input
                    type="number"
                    id="max-views"
                    bind:value={n}
                    min="1"
                    class="input-field"
                    placeholder="N"
                    required
                    disabled={!!secretLink}
                />
            </div>

            <!-- Expiration Date -->
            <div class="input-group flex-1">
                <label for="expiration" class="input-label">Optional Expiration Date</label>
                <input
                    type="date"
                    id="expiration"
                    value={expiresAt}
                    class="input-field"
                    disabled={!!secretLink}
                />
            </div>
        </div>

        <!-- Optional Passcode -->
        <!---
        <div class="input-group">
            <label for="passcode" class="input-label">Optional Passcode</label>
            <input
                type="text"
                id="passcode"
                bind:value={passcode}
                class="input-field"
                placeholder="Enter a passcode (optional)"
                disabled={!!secretLink}
            />
        </div>
        -->

        <!-- Submit Button -->
        {#if !secretLink}
            <div class="submit-container">
                <button type="submit" class="submit-button">Get Secret Link</button>
            </div>
        {/if}
    </form>

    <br />

    {#if secretLink}
        <br />
        <h3>Send this link out to share your secret!</h3>
        <div class="input-group flex items-center">
            <input
                type="text"
                id="secret-link"
                value={secretLink}
                readonly
                class="input-field link"
                placeholder="Your link will appear here"
            />
            <button type="button" class="copy-button mt-2" onclick={() => copy(secretLink)}>
                <i class="fa fa-clipboard"></i>
                copy
            </button>
        </div>

        <a data-sveltekit-reload href="/" class="home-link">
            <i class="fa fa-long-arrow-alt-left"></i>
            Make another secret
        </a>
    {/if}
</div>
