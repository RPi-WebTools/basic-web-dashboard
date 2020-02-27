<template>
    <div class="contact">
        <h1>Contact</h1>
        <p>
            <ul>
                <li>Mail: {{email}}</li>
                <li>Web: {{web}}</li>
            </ul>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            email: 'test@test.com',
            web: 'https://.ddg.gg'
        }
    }
}
</script>
