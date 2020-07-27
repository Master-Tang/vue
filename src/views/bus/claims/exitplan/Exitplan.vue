<template>
    <div class="my-padding">
        
    </div>
</template>
<script>
import $ from "@/api/exitplan"

export default {
    data(){
        return{
            form:{
                scheme:[],
                claimsNumber:""
            }
        }
    },
    created(){
        this.form.claimsNumber=this.$route.query.claimsNumber;
        $.busExitsList({claimsNumber:this.$route.query.claimsNumber}).then(res=>{
            console.log(res.data)
        })
    }    
}
</script>
<style scoped>

</style>