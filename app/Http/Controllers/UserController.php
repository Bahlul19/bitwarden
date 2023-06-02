<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    private $status_code = 200;

    public function userSignUp(Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
            "phone" => "required"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        $name = $request->name;

        $userDataArray = array(
            "name" => $request->name,
            "email" => $request->email,
            "password" => md5($request->password),
            "phone" => $request->phone
        );

        $user_status = User::where("email", $request->email)->first();

        if(!is_null($user_status)) {
           return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! This email already taken"]);
        }

        $user = User::create($userDataArray);

        if(!is_null($user)) {
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Failed to register"]);
        }
    }


    // User Login Function
    public function userLogin(Request $request) {

        $validator = Validator::make($request->all(),
            [
                "email" => "required|email",
                "password" => "required"
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        $email_status = User::where("email", $request->email)->first();

        if(!is_null($email_status)) {

            $password_status = User::where("email", $request->email)->where("password", md5($request->password))->first();
            if(!is_null($password_status)) {
                $user = $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user]);
            }

            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
            }
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        }
    }

    // User Details Functions
    public function userDetail($email) {
        $user  = array();
        if($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }
}