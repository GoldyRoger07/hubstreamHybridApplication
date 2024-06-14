package info.android.raikiris;

import org.apache.cordova.CordovaPlugin;

import java.io.File;

import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.webkit.MimeTypeMap;

/**
 * This class echoes a string called from JavaScript.
 */
public class MyFileOpener extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    public void open(String file, String mimeType,String applicationName, CallbackContext callbackContext) {
            try {
                // Vérifier si le fichier existe
                File f = new File(file);
                if (!f.exists()) {
                    callbackContext.error("Le fichier spécifié n'existe pas.");
                    return;
                }

                // Créer une intention pour ouvrir le fichier avec l'application spécifiée
                Intent intent = new Intent(Intent.ACTION_VIEW);
                Uri uri = Uri.fromFile(f);
                intent.setDataAndType(uri, mimeType);
                
                // Ajouter le nom de l'application spécifiée comme composant
                intent.setPackage(applicationName);

                // Démarrer l'intention
                cordova.getActivity().startActivity(intent);

                callbackContext.success();
            } catch (Exception e) {
                callbackContext.error("Erreur lors de l'ouverture du fichier: " + e.getMessage());
            }
    }
 
}
