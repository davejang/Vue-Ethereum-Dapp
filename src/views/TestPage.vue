<template>
    <div class="container">
        <h1 v-if="$store.state.isMetaMaskConnected == true">MetaMask Connected!!</h1>
        <button v-if="$store.state.isMetaMaskConnected == false" @click="connectWallet">MetaMask Connection</button>
        <div>
            current address:{{$store.state.address}}
        </div>
        <h1>Here is the value stored on the blockchain: {{currentValue}}</h1>
        <input
            v-model="contractValue"
            type="text" 
            placeholder="input something"
        />
        <h1>{{loading}}</h1>
        <button class="button is-primary" @click="setValue">start contract</button>
    </div>
</template>

<script lang="js">
    import { onMounted, ref } from '@vue/runtime-core'
    import { useStore } from 'vuex'
    import Web3 from "web3";
    import MyContract from '../../build/contracts/MyContract.json'
    
    const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS
    const web3 = new Web3(window.web3.currentProvider)

    const isMetamaskSupported = ref(false)
    const address = ref("")
    onMounted(()=>{
        isMetamaskSupported.value = typeof window.ethereum !== 'undefined';
    })
    
    export default {
        data() {
            return {
                contractValue: "",
                currentValue: "",
                contractJson: MyContract,
                isValueUpdated: false,
                loading: "",
            };
        },
        methods: {
            async setValue() {
                this.loading = 'Transaction request is being processed'
                let myContract = new web3.eth.Contract(this.contractJson.abi, contractAddress)
                let setValue = await myContract.methods.set(this.contractValue)
                .send({
                    from: this.$store.state.address
                })
                if (setValue) {
                    this.loading = 'add completed'
                    this.isValueUpdated = true;
                }
            },
            async getCurrentValue() {
                let myContract = new web3.eth.Contract(this.contractJson.abi, contractAddress)
                let getValue = await myContract.methods.get().call()
                this.currentValue = getValue
            },
            async connectWallet() {
            const accounts = await (window).ethereum.request({ method: 'eth_requestAccounts'});
            address.value = accounts[0];
            this.$store.commit('setAddress', address.value);
            this.$store.commit('connectMetaMask');
            },
        },
        watch: {
            
            isValueUpdated: function(newValue){
                if(newValue == true){
                  window.location.reload(true);
                }
            },
        },
        created: function() {
            const store = useStore();
            document.title = 'Ethereum Dapp'

            this.getCurrentValue();
            window.ethereum.on('accountsChanged', function (accounts) {
                store.commit('setAddress', accounts[0]);
                console.log('accountsChanged', accounts[0]);
                if(store.state.address == undefined) {
                    console.log('account disconnected');
                    store.commit('setAddress','disconnected');
                    store.commit('disconnectMetaMask')
                }
            });              
        }
    };
</script>

<style scoped lang="scss">
    
</style>