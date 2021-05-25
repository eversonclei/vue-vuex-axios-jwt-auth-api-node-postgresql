<template>
    <div class="admin-pages"> 
        <PageTitle icon="fa fa-user" main="Usuários" sub="" />

        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Usuários" active>
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin }
}
</script>

<style>

</style>