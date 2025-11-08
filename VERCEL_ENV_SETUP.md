# Vercel Environment Variables Setup

## 🎯 Your Webhook is Working - Just Need Vercel Environment Variables!

Your webhook is successfully deployed at `https://audiojones.com/api/whop` but needs environment variables in Vercel to write to Firebase.

## Steps to Complete Setup:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/ajdigitalllc/audiojones-com/settings/environment-variables

### 2. Add These 5 Environment Variables:

**FIREBASE_PROJECT_ID**
```
audiojoneswebsite
```

**FIREBASE_CLIENT_EMAIL**
```
firebase-adminsdk-fbsvc@audiojoneswebsite.iam.gserviceaccount.com
```

**FIREBASE_PRIVATE_KEY**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaRjnF8/YxaqFB
UyllYC3EkDprjUikwAoV5YpWxqdRFxpvW6MoKTEwzhBvCAC4vzaaTis0sb3mMsBR
LU1ZuOTFknb8IlS/hU74NGA4GiNSxRnjFIgTRtGAJGd4AJt+LlkRAeQIyTQa7T0g
i8jfe0kjCHN9pJBbCg11JLchnPRYyaR4lxpIlrZjqu1Gna5JlR6ljWUpCRR348x8
SiF05YCgosUpagv5eocFra4WrYCvGfncR2GuXAfvYgDN+7C5QSg6GMzLzOJQKBxU
0vrU2Ezwo6KfFgCyMr7xsVGARBrsJVT3b3TXonmTWdpSvX0oL925ldT6yU5abY21
A4Chl/kjAgMBAAECggEABIrv1ZIqZVX5ZJqKXAMMOD8E+oHqKgvCco2dRiUBfmiR
iOsxOKZOcAD3EaFWoBoJ4O0qwYdAVFK+G7OJS+f6gbKNB6t4jc7jB54iocH+IiO7
y8QOpf6px1BB921slG4+hZZTmCXHbVvWknOyIiw8QQPneh635lLyPYAHDeLUM2Xp
fU5nq3TrUw559xrxZFlxIWIhnQwLJnhvDQxF7aJeKEJ0UnyXRoJd0pJJIoqjV3a9
45MBQGtS54G+9dkNJU8Pzfw2N/KGLGSrC6VX1Z/IL0ZVxCDshDAInScu4444UXSP
fAyEJ5Hrm20t0E3hqzimodZ04M66j2bq3ce9/TVK3QKBgQDNb7BmzeWIrIPWi6f6
RgqaAeCM1f+q4MxK2h9O0ek66xcWOKh3k8Pb0N882LvLvw41CzIV34jGgzqwzxBt
yYfhoKrU69uzsT/P7d6BKQ1+w3KpAPkP4LwY9IPZqoTIMb2jC1E/tYLSekzYik3n
NX1B6Z5H0YwkLyUSkyKWl5opnQKBgQDAPuDUVvn/nsoEc1/9iv8lPBBIEH0EGJn7
PDSkgNC7RiCPsESShHFZaZIYBkSJzRRpO1sPG7zIuhRH0MCyxBvc6aWoQmOSzo1o
b7wPh9rmtekxT1/uq+LsSp6XOV4yaY6ecfM39H01nGjqgPvJ/i1ws0XY7iA+egl/
4bvgaLWRvwKBgQChJljY+/BvOuycUqbtAx5z2r8bmw3YK0j1+o6OlMkAp8NPchhs
3KPJ/dnv8A+4buGlKGgckmHHXs+ePH+lr24AxrjbFz0bgxIMeIqPBPYKFyUNf67g
DqleZgg7qbBJHgOlL06HzEmX88nuHuenU+Uy3CCGM9Fb3QOWw4ZhXQDYXQKBgHmq
UZeQw/7me2t9qQ5I3VivPo6dAMGK4EiDvb0uWOtsYkcNgxhHAYVYrsDNlqqvQ2+l
xOc24q8WNKeOkaWRPyD8LX7jJSlP12Z08EvT6tF/5ujyFwBxf9eTEfMat2aoLz5P
V2HeNS+soSloH/GiDxf4HQhBC97+VOy9660GF4L5AoGAeI+j3uAgqMTYxVUnFS7u
RmBJK6dwFL911sgkangUcHLf66WeWO/evgsGvpptiLtd14bf2gW8RTLsCPVxsBzD
4pwxs0WvBXVexYTsOp8pNn5RXWg6hhXEgCd8FXTT0HMmfAAEvR/FZU6PV8kQFnFQ
0kZNtFLhst4yY5vOzDnX8JY=
-----END PRIVATE KEY-----
```
⚠️ **CRITICAL:** Copy the private key EXACTLY as shown above (multiple lines) into Vercel

**WHOP_APP_ID**
```
app_Tzvx5EwI6UjdyS
```

**WHOP_API_KEY**
```
apik_nhOhXhdnwNN5P_A2017799_edd16560a6a3e2f3404b81eef67cadbdc8fb53c61f5c385382d8250832818c3d
```

### 3. After Adding Variables
- Vercel will automatically redeploy
- Wait 2-3 minutes for deployment to complete

### 4. Test the Production Webhook
Run this test:
```bash
node test-whop-webhook.js 
```

### 5. Verify in Firebase Console
Check for new records at:
https://console.firebase.google.com/project/audiojoneswebsite/firestore

You should see:
- ✅ `customers` collection with test customer data
- ✅ `subscription_events` collection with webhook events

## Current Status:
- ✅ Webhook deployed and responding: https://audiojones.com/api/whop  
- ✅ Local `.env.local` configured correctly
- ⏳ Need Vercel environment variables added
- ⏳ Then ready for production Whop webhook integration!

## Whop Webhook URL for Your App:
```
https://audiojones.com/api/whop
```

Add this URL to your Whop app dashboard for automatic webhook delivery.