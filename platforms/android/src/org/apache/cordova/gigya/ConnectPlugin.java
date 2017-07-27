package org.apache.cordova.gigya;

import com.gigya.socialize.GSObject;
import com.gigya.socialize.GSResponse;
import com.gigya.socialize.GSResponseListener;
import com.gigya.socialize.android.GSAPI;
import com.gigya.socialize.android.GSPluginFragment;
import com.gigya.socialize.android.event.GSAccountsEventListener;
import com.gigya.socialize.android.event.GSDialogListener;
import com.gigya.socialize.android.event.GSPluginListener;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;


public class ConnectPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("init")) {
            executeInit(args);
            return true;
        }
        if (action.equals("registerToGlobalEvents")) {
            registerToGlobalEvents(callbackContext);
            return true;
        } else if (action.equals("sendRequest")) {
            executeSendRequest(args, callbackContext);
            return true;
        } else if (action.equals("loginToProvider")) {
            executeLoginToProvider(args, callbackContext);
            return true;
        } else if (action.equals("addConnectionToProvider")) {
            executeAddConnectionToProvider(args, callbackContext);
            return true;
        } else if (action.equals("logout")) {
            executeLogout();
            return true;
        } else if (action.equals("showPlugin")) {
            executeShowPlugin(args, callbackContext);
            return true;
        } else if (action.equals("debugOptionEnableTestNetworks")) {
            GSAPI.__DEBUG_OPTION_ENABLE_TEST_NETWORKS = true;
            return true;
        } else {
            return false;
        }
    }

    private void executeInit(JSONArray args) throws JSONException {
        String apiKey = args.getString(0);
        String apiDomain = args.getString(1);

        GSAPI.getInstance().initialize(cordova.getActivity().getApplicationContext(), apiKey, apiDomain);
    }

    private void executeSendRequest(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String method = args.getString(0);
        GSObject params = getGSObjectFromJSONString(args.getString(1));
        if (params == null) {
            callbackContext.error(getCallbackResponseFromGSResponse(getInvalidParameterFormatResponse(method)));
            return;
        }

        boolean useHTTPS = args.getBoolean(2);

        GSAPI.getInstance().sendRequest(method, params, useHTTPS, new GSResponseListener() {
            public void onGSResponse(String method, GSResponse response, Object context) {
                if (response.getErrorCode() == 0)
                    callbackContext.success(getCallbackResponseFromGSResponse(response));
                else
                    callbackContext.error(getCallbackResponseFromGSResponse(response));
            }
        }, null);
    }

    private void executeLoginToProvider(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String provider = args.getString(0);
        GSObject params = getGSObjectFromJSONString(args.getString(1));
        if (params == null) {
            callbackContext.error(getCallbackResponseFromGSResponse(getInvalidParameterFormatResponse("login")));
            return;
        }

        params.put("provider", provider);

        try {
            GSAPI.getInstance().login(cordova.getActivity(), params, new GSResponseListener() {
                @Override
                public void onGSResponse(String method, final GSResponse response, Object context) {
                    if (response.getErrorCode() == 0)
                        callbackContext.success(getCallbackResponseFromGSResponse(response));
                    else
                        callbackContext.error(getCallbackResponseFromGSResponse(response));
                }
            }, null);
        } catch (Exception ex) {
            callbackContext.error(getCallbackResponseFromGSResponse(getNetworkErrorResponse("login")));
        }
    }

    private void executeAddConnectionToProvider(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String provider = args.getString(0);
        GSObject params = getGSObjectFromJSONString(args.getString(1));
        if (params == null) {
            callbackContext.error(getCallbackResponseFromGSResponse(getInvalidParameterFormatResponse("addConnection")));
            return;
        }

        params.put("provider", provider);

        try {
            GSAPI.getInstance().addConnection(cordova.getActivity(), params, new GSResponseListener() {
                @Override
                public void onGSResponse(String method, final GSResponse response, Object context) {
                    if (response.getErrorCode() == 0)
                        callbackContext.success(getCallbackResponseFromGSResponse(response));
                    else
                        callbackContext.error(getCallbackResponseFromGSResponse(response));
                }
            }, null);
        } catch (IllegalArgumentException ex) {
            callbackContext.error(getCallbackResponseFromGSResponse(getNetworkErrorResponse("addConnection")));
        }
    }

    private void executeLogout() throws JSONException {
        GSAPI.getInstance().logout();
    }

    private void executeShowPlugin(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String pluginName = args.getString(0);
        GSObject params = getGSObjectFromJSONString(args.getString(1));
        if (params == null) {
            callbackContext.error(getCallbackResponseFromGSResponse(getInvalidParameterFormatResponse(pluginName)));
            return;
        }

        GSAPI.getInstance().showPluginDialog(pluginName, params, new GSPluginListener() {
            @Override
            public void onLoad(GSPluginFragment pluginFragment, GSObject event) {
                onEvent(pluginFragment, event);
            }

            @Override
            public void onError(GSPluginFragment pluginFragment, GSObject event) {
                event.put("errorCode", event.getInt("errorCode", 0)); // convert String to int
                onEvent(pluginFragment, event);
            }

            @Override
            public void onEvent(GSPluginFragment pluginFragment, GSObject event) {
                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "{\"event\":" + event.toJsonString() + "}");
                pluginResult.setKeepCallback(true);
                callbackContext.sendPluginResult(pluginResult);
            }
        }, new GSDialogListener() {
            @Override
            public void onDismiss(boolean wasCanceled, GSObject event) {
                if (event == null)
                    event = new GSObject();

                event.put("eventName", "dismiss");
                event.put("canceledByUser", wasCanceled);

                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "{\"event\":" + event.toJsonString() + "}");
                pluginResult.setKeepCallback(false);
                callbackContext.sendPluginResult(pluginResult);
            }
        });
    }

    private void registerToGlobalEvents(final CallbackContext callbackContext) throws JSONException {
        GSAPI.getInstance().setAccountsEventListener(new GSAccountsEventListener() {
            @Override
            public void onLogin(GSObject account, Object context) {
                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "{\"type\":\"login\", \"account\":" + account.toJsonString() + "}");
                pluginResult.setKeepCallback(true);
                callbackContext.sendPluginResult(pluginResult);
            }

            @Override
            public void onLogout(Object context) {
                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "{\"type\":\"logout\"}");
                pluginResult.setKeepCallback(true);
                callbackContext.sendPluginResult(pluginResult);
            }
        });
    }

    private GSObject getGSObjectFromJSONString(String json) {
        try {
            return new GSObject(json);
        } catch (Exception ex) {
            return null;
        }
    }

    private String getCallbackResponseFromGSResponse(GSResponse response) {
        GSObject data = response.getData();
        data.put("errorCode", response.getErrorCode());
        data.put("errorMessage", response.getErrorMessage());
        data.put("errorDetails", response.getErrorDetails());

        return data.toJsonString();
    }

    private GSResponse getInvalidParameterFormatResponse(String method) {
        return new GSResponse(method, new GSObject(), 400004, "Invalid parameter format", null);
    }

    private GSResponse getNetworkErrorResponse(String method) {
        return new GSResponse(method, new GSObject(), 500026, "Network error", null);
    }
}