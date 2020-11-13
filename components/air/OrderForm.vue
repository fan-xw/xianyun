<template>
   <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">
                <!-- 表单只有一个，这里的 div 可以跟随数组的长度进行遍历 -->
                <div class="member-info-item"
                     v-for="(user,index) in users"
                     :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="请输入乘机人姓名" class="input-with-select" v-model="user.username">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                                <el-option label="儿童" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input placeholder="请输入证件号码"  class="input-with-select" v-model="user.id">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                                <el-option label="护照" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <!-- v-model绑定Array类型的变量即可。el-checkbox 的 label属性是该 checkbox 对应的值， -->
            <el-checkbox-group v-model="insurances">
                <div class="insurance-item"
                     v-for="item in data.insurances"
                     :key="item.id">
                    <el-checkbox 
                    :label="item.id" 
                    border>
                    {{item.type}}: ￥{{item.price}} / 份 X {{users.length}} 最高赔付 {{item.compensation}}
                    </el-checkbox> 
                </div>
            </el-checkbox-group>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入手机号码">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input placeholder="请输入验证码"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['data'],
    data () {
        return {
            // 乘机人应该是一个数组，里面的每个对象都是一个乘机人，如果想删除的话，只需要 push / splice
            users :[
                {
                    username:'',
                    id:''
                },
            ],
            insurances:[]
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                username:'',
                id:''
            });
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            
        },

        // 提交订单
        handleSubmit(){
            console.log('提交请求');
            console.log(this.users);
            console.log(this.insurance);
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    // 这里是每个乘机人的外容器 
    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>